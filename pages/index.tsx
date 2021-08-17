import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { EditTable } from "../components/EditTable";
import { FileListing } from "../components/FileListing";
import { ToolBar } from "../components/ToolBar";
import { TranslationFileContent } from "../types";
import { DocstringPreview } from "../components/DocstringPreview";
import { services } from "../services";
import { useConfirmLeaveEffect } from "../hooks/useConfirmLeaveEffect";
import { useCtrlSaveEffect } from "../hooks/useCtrlSaveEffect";

import { LivePreview } from "../components/LivePreview";

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

  const handleFileSelected = (filepath: string) => {
    if (
      !hasPendingChanges ||
      window.confirm("You have unsaved changes. Do you want leave the page?")
    ) {
      services
        .getFileContent(filepath)
        .then((response) => {
          setFile(response.data);
          setPreviewUrl(response.previewUrl);
        })
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
      services.saveChanges(file).then(() => setHasPendingChanges(false));
    }
  }, [file, hasPendingChanges]);

  useConfirmLeaveEffect(hasPendingChanges);
  useCtrlSaveEffect(handleSave);

  return (
    <div className="app">
      <Head>
        <title>Internationalizer</title>
      </Head>
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
                languages={activeLanguages}
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
      <LivePreview languageCode={previewLanguage} previewUrl={previewUrl} />
    </div>
  );
};

export default HomePage;
