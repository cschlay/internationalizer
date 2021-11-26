import glob from "glob";
import { GetServerSideProps } from "next";
import { TranslationFileContent, TranslationFiles } from "../../types";
import Head from "next/head";
import { FileListing } from "../../components/FileListing";
import { readFileContent } from "../../utils/readFileContent";
import { ToolBar } from "../../components/ToolBar";
import css from "./session.module.css";
import { DocstringPreview } from "../../components/DocstringPreview";
import { EditView } from "../../components/EditView";
import { useEffect, useState } from "react";

interface Props {
  files: TranslationFiles;
  content?: TranslationFileContent;
}

const SessionPage = ({ files, content }: Props) => {
  const [translation, setTranslation] = useState(null);

  useEffect(() => {
    if (content) {
      setTranslation(content.content);
    }
  }, [content]);

  if (!translation) {
    return (
      <div className={css.Layout}>
        <Head>
          <title>Internationalizer</title>
        </Head>
        <FileListing data={files} />
      </div>
    );
  }

  return (
    <div className={css.Layout}>
      <Head>
        <title>Internationalizer</title>
      </Head>
      <FileListing data={files} />

      <div>
        {content.path && (
          <ToolBar
            activeLanguages={content.locales}
            setActiveLanguages={() => {}}
            setPreviewLanguage={() => {}}
            hasPendingChanges={false}
            onSave={() => {}}
          />
        )}

        <main>
          <div className={css.EditPanel}>
            <DocstringPreview
              docstring={translation.docstring}
              previewLanguage={"en"}
              setPreviewUrl={() => {}}
            />

            {content.path ? (
              <EditView
                languages={content.locales}
                translations={content.content}
                onChange={() => {}}
              />
            ) : (
              <p className={css.WelcomeText}>
                Start translation by selecting a file in the left.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
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
