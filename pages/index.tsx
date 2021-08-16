import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { EditTable } from "../components/EditTable";
import { toTSX } from "../utils/toTSX";
import { FileListing } from "../components/FileListing";
import { ToolBar } from "../components/ToolBar";
import { TranslationFileContent } from "../types";
import { DocstringPreview } from "../components/DocstringPreview";
import styles from "../styles/IframePreview.module.css";

const HomePage = () => {
  const [file, setFile] = useState<TranslationFileContent>({
    name: "",
    translations: {},
    path: "",
    relativePath: "",
  });
  const [hasPendingChanges, setHasPendingChanges] = useState<boolean>(false);
  const [activeLanguages, setActiveLanguages] = useState<string[]>(["en"]);
  const [previewLanguage, setPreviewLanguage] = useState<string>("en");
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileSelected = (filepath) => {
    if (!hasPendingChanges || window.confirm("You have unsaved changes.")) {
      fetch(`/api/get-file-content?file=${encodeURIComponent(filepath)}`)
        .then((res) => res.json())
        .then(setFile)
        .then(() => setHasPendingChanges(false));
    }
  };

  const handleChange = (locale: string, key: string, value: string) => {
    setHasPendingChanges(true);
    const updatedFile: TranslationFileContent = { ...file };
    updatedFile.translations[key][locale] = value;
    setFile(updatedFile);
  };

  const handleSave = useCallback(() => {
    if (hasPendingChanges) {
      fetch("/api/write-changes", {
        method: "POST",
        body: JSON.stringify({ path: file.path, content: toTSX(file) }),
      }).then(() => setHasPendingChanges(false));
    }
  }, [file, hasPendingChanges]);

  useEffect(() => {
    if (hasPendingChanges) {
      window.addEventListener("beforeunload", handlePendingChanges);
    }
    return () =>
      window.removeEventListener("beforeunload", handlePendingChanges);
  }, [hasPendingChanges]);

  useEffect(() => {
    const saveEventHandler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        // Default CTRL + S is to save page.
        event.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", saveEventHandler);
    return () => window.removeEventListener("keydown", saveEventHandler);
  }, [handleSave]);

  return (
    <>
      <Head>
        <title>Internationalizer</title>
      </Head>
      <div className="app">
        <FileListing
          activeFilePath={file.relativePath}
          onFileSelected={handleFileSelected}
        />

        <div>
          {file.path && (
            <ToolBar
              activeLanguages={activeLanguages}
              setActiveLanguages={setActiveLanguages}
              setPreviewLanguage={setPreviewLanguage}
              hasPendingChanges={hasPendingChanges}
              onSave={handleSave}
            />
          )}

          <main>
            <div className="edit-module">
              <DocstringPreview
                docstring={file.docstring}
                previewLanguage={previewLanguage}
                setPreviewUrl={setPreviewUrl}
              />

              {file.path ? (
                <EditTable
                  translations={file.translations}
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
        <div className="preview">
          <iframe src={previewUrl} className={styles.IframePreview} />
        </div>
      </div>
    </>
  );
};

const handlePendingChanges = (event) => {
  event.returnValue = "";
};

export default HomePage;
