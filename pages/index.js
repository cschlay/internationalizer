import Head from "next/head";
import { useState } from "react";
import { EditTable } from "../components/EditTable";
import { toTSX } from "../utils/toTSX";
import { FileListing } from "../components/FileListing";

const HomePage = () => {
  const [activeFile, setActiveFile] = useState({ path: "", relativePath: "" });
  const [saved, setSaved] = useState(true);

  const handleFileSelected = (filepath) => {
    fetch(`/api/get-file-content?file=${encodeURIComponent(filepath)}`)
      .then((res) => res.json())
      .then(setActiveFile);
  };

  const handleChange = (locale, key, value) => {
    setSaved(false);
    const updated = { ...activeFile };
    updated.translations[key][locale] = value;
    setActiveFile(updated);
  };

  const handleSave = () => {
    const tsxString = toTSX(activeFile);
    console.log(tsxString);
    fetch("/api/write-changes", {
      method: "POST",
      body: JSON.stringify({ path: activeFile.path, content: tsxString }),
    }).then(() => setSaved(true));
  };

  return (
    <div>
      <Head>
        <title>Internationalizer</title>
      </Head>
      <main>
        <FileListing
          activeFilePath={activeFile.relativePath}
          onFileSelected={handleFileSelected}
        />

        <div className="preview">
          <div className="toolbar">
            <div>
              <button onClick={handleSave}>Save</button>{" "}
              <span>{!saved && "You have unsaved changes."}</span>
            </div>

            <div>
              <button>Previous</button>
              <button>Save and open next</button>
            </div>
          </div>

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
        </div>
      </main>
    </div>
  );
};

export default HomePage;
