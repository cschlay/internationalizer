import glob from "glob";
import { GetServerSideProps } from "next";
import { TranslationFileContent, TranslationFiles } from "../../types";
import { readFileContent } from "../../utils/readFileContent";
import { ToolBar } from "../../components/ToolBar";
import { DocstringPreview } from "../../components/DocstringPreview";
import { EditView } from "../../components/EditView";
import { ChangeEvent, useEffect, useState } from "react";
import { MainLayout } from "../../components/MainLayout";
import { toTSX } from "../../utils/toTSX";

interface Props {
  files: TranslationFiles;
  content?: TranslationFileContent;
}

const SessionPage = ({ files, content }: Props) => {
  const [previewLocale, setPreviewLocale] = useState<string>("en");
  const [hasPendingChanges, setHasPendingChanges] = useState<boolean>(false);
  const [translation, setTranslation] = useState(null);

  const handleChange = (locale: string, key: string, value: string) => {
    setHasPendingChanges(true);
    const languages = { ...translation[key], [locale]: value };
    setTranslation({ ...translation, [key]: languages });
  };

  const handleSave = () => {
    // TODO: Call save
    console.log(toTSX({ ...content, content: translation }));

    setHasPendingChanges(false);
  };

  useEffect(() => {
    if (content) {
      setTranslation(content.content);
    }
  }, [content]);

  return (
    <MainLayout files={files}>
      {translation && (
        <div>
          {content.path && (
            <ToolBar
              locales={content.locales}
              activeLanguages={content.locales}
              setActiveLanguages={() => {}}
              setPreviewLanguage={setPreviewLocale}
              hasPendingChanges={hasPendingChanges}
              onSave={handleSave}
            />
          )}

          <main>
            <div>
              <DocstringPreview
                docstring={translation.docstring}
                previewLanguage={previewLocale}
                setPreviewUrl={() => {}}
              />

              {content.path && (
                <EditView
                  languages={content.locales}
                  translations={translation}
                  onChange={handleChange}
                />
              )}
            </div>
          </main>
        </div>
      )}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { project } = context.query;
  const root = process.env.PROJECTS_DIRECTORY.replaceAll("\\", "/");
  const pattern = `${root}/${project}/+(components|core|translations)/**/*.i18n.+(ts|tsx)`;
  const files: string[] = glob.sync(pattern, {});

  const data = {};

  files.forEach((file) => {
    const path = file.replace(`${root}/${project}/`, "");
    const [, category, ...parts] = path.split("/");

    const fileName = parts[parts.length - 1];

    if (!data[category]) {
      data[category] = [];
    }

    const name = fileName.replace(".i18n.tsx", "");
    if (category === "pages") {
      data[category].push({
        name,
        path,
        url:
          "/" +
          path.replace(`translations/pages/`, "").replace(".i18n.tsx", ""),
      });
    } else {
      data[category].push({
        name: fileName.replace(".i18n.tsx", ""),
        path,
      });
    }
  });

  return {
    props: {
      files: data,
      content: context.query.file
        ? readFileContent(
            root,
            project as string,
            context.query.file as string,
            context.query.name as string
          )
        : null,
    },
  };
};

export default SessionPage;