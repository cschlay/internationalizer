import glob from "glob";
import { GetServerSideProps } from "next";
import {
  ProjectDetails,
  TranslationFileContent,
  TranslationFiles,
} from "../../types";
import { readFileContent } from "../../utils/readFileContent";
import { ToolBar } from "../../components/ToolBar";
import { DocstringPreview } from "../../components/DocstringPreview";
import { EditView } from "../../components/EditView";
import { useCallback, useEffect, useState } from "react";
import { MainLayout } from "../../components/MainLayout";
import { toTSX } from "../../utils/toTSX";
import { Git } from "../../utils/git";
import { isAuthenticated } from "../../utils/authentication";
import css from "./[project].module.css";
import { LivePreview } from "../../components/LivePreview";

interface Props {
  project: ProjectDetails;
  files: TranslationFiles;
  content?: TranslationFileContent;
}

const SessionPage = ({ project, files, content }: Props) => {
  const [previewLocale, setPreviewLocale] = useState<string>("en");
  const [hasPendingChanges, setHasPendingChanges] = useState<boolean>(false);
  const [translation, setTranslation] = useState(null);

  const pendingChangesListener = useCallback((event: BeforeUnloadEvent) => {
    event.returnValue = "message";
    return "message";
  }, []);

  const handleChange = (locale: string, key: string, value: string) => {
    if (!hasPendingChanges) {
      window.addEventListener("beforeunload", pendingChangesListener);
    }

    setHasPendingChanges(true);
    const languages = { ...translation[key], [locale]: value };
    setTranslation({ ...translation, [key]: languages });
  };

  const handleSave = useCallback(async () => {
    console.info("Save changes!");
    await fetch("/api/write-changes", {
      method: "POST",
      body: JSON.stringify({
        project: project.name,
        path: content.relativePath,
        content: toTSX(content.exportName, {
          ...content,
          content: translation,
        }),
      }),
    });

    window.removeEventListener("beforeunload", pendingChangesListener);
    setHasPendingChanges(false);
  }, [content, pendingChangesListener, project.name, translation]);

  useEffect(() => {
    if (content) {
      setTranslation(content.content);
    }
  }, [content]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleSave]);

  return (
    <MainLayout files={files} project={project}>
      {translation && (
        <div className={css.Content}>
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

          <main className={css.Main}>
            <div className={css.EditArea}>
              <DocstringPreview
                docstring={content.docstring}
                previewLanguage={previewLocale}
                setPreviewUrl={() => {}}
              />

              <EditView
                languages={content.locales}
                translations={translation}
                onChange={handleChange}
              />
            </div>

            <LivePreview languageCode="en" previewUrl="" />
          </main>
        </div>
      )}
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const authenticated = isAuthenticated(context.req.cookies);
  if (!authenticated) {
    return {
      props: {},
      redirect: {
        destination: "/login",
      },
    };
  }

  const { project } = context.query;
  const git = new Git(project as string);
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
      project: {
        branch: git.branch(),
        name: project,
      },
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
