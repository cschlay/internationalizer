import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { EditTable } from "../components/EditTable";
import { toTSX } from "../utils/toTSX";
import { FileListing } from "../components/FileListing";
import { ToolBar } from "../components/ToolBar";

const HomePage = () => {
  const [activeFile, setActiveFile] = useState({ path: "", relativePath: "" });
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  const handleFileSelected = (filepath) => {
    fetch(`/api/get-file-content?file=${encodeURIComponent(filepath)}`)
      .then((res) => res.json())
      .then(setActiveFile);
  };

  const handleChange = (locale, key, value) => {
    setHasPendingChanges(true);
    const updated = { ...activeFile };
    updated.translations[key][locale] = value;
    setActiveFile(updated);
  };

  const handleSave = useCallback(() => {
    if (hasPendingChanges) {
      const tsxString = toTSX(activeFile);
      fetch("/api/write-changes", {
        method: "POST",
        body: JSON.stringify({ path: activeFile.path, content: tsxString }),
      }).then(() => setHasPendingChanges(false));
    }
  }, [activeFile, hasPendingChanges]);

  useEffect(() => {
    const handler = (event) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [handleSave]);

  return (
    <>
      <Head>
        <title>Internationalizer</title>
      </Head>
      <div className="app">
        <FileListing
          activeFilePath={activeFile.relativePath}
          onFileSelected={handleFileSelected}
        />

        <div className="preview">
          {activeFile.path && (
            <ToolBar
              hasPendingChanges={hasPendingChanges}
              onSave={handleSave}
            />
          )}

          <main>
            {activeFile.path ? (
              <EditTable
                translations={activeFile.translations}
                onChange={handleChange}
              />
            ) : (
              <p style={{ textAlign: "center" }}>
                Start tranlating by selecting file in the left
              </p>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;
