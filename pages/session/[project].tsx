import { GetServerSideProps, NextPage } from "next";
import {
  ProjectDetails,
  Translation,
  TranslationFileContent,
  TranslationFiles,
} from "../../types";
import { useCallback, useEffect, useState } from "react";
import { DocStringPreview } from "../../components/DocString/DocStringPreview";
import { EditView } from "../../components/EditView/EditView";
import { Git } from "../../utils/git";
import { LivePreview } from "../../components/LivePreview/LivePreview";
import { MainLayout } from "../../components/MainLayout";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import css from "./[project].module.css";
import { env } from "../../utils/env";
import { getFileInfo } from "../../utils/getFileInfo";
import { isAuthenticated } from "../../utils/server-only/authentication";
import { readFileContent } from "../../utils/read-file/readFileContent";
import { toTSX } from "../../utils/tsx/toTSX";
import { useCtrlSaveEffect } from "../../hooks/useCtrlSaveEffect";
import { usePendingChanges } from "../../hooks/usePendingChanges";

interface Props {
  project: ProjectDetails;
  files: TranslationFiles;
  content?: TranslationFileContent;
}

const SessionPage: NextPage<Props> = ({ project, files, content }) => {
  const { hasPendingChanges, setHasPendingChanges } = usePendingChanges();
  const [editLocales, setEditLocales] = useState<string[]>(["en"]);
  const [preview, setPreview] = useState("");
  const [previewLocale, setPreviewLocale] = useState<string>("en");
  const [translation, setTranslation] = useState<Translation>({});

  const handleChange = (locale: string, key: string, value: string) => {
    setHasPendingChanges(true);
    const languages = { ...translation[key], [locale]: value };
    setTranslation({ ...translation, [key]: languages });
  };

  const handleSave = useCallback(async () => {
    if (!content) {
      console.error("Content is not defined!");
      return;
    }

    await fetch("/api/write-changes", {
      method: "POST",
      body: JSON.stringify({
        project: project.name,
        path: content.relativePath,
        content: toTSX({
          ...content,
          content: translation,
        }),
      }),
    });

    setHasPendingChanges(false);
  }, [content, project.name, setHasPendingChanges, translation]);

  useEffect(() => {
    if (content) {
      setTranslation(content.content);
    }
  }, [content]);

  useCtrlSaveEffect(handleSave);

  if (!content) {
    return (
      <MainLayout files={files} project={project}>
        <p style={{ margin: "10rem auto" }}>
          Select a translation file to start!
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout files={files} project={project}>
      <div className={css.Content}>
        {content.absolutePath && (
          <ToolBar
            locales={content.locales}
            activeLanguages={editLocales}
            setActiveLanguages={setEditLocales}
            setPreviewLanguage={setPreviewLocale}
            hasPendingChanges={hasPendingChanges}
            onSave={handleSave}
          />
        )}

        <main className={css.Main}>
          <div className={`${css.EditArea} scrollbar`}>
            <DocStringPreview
              documentation={content.docstring}
              setPreviewPath={setPreview}
            />

            <EditView
              locales={editLocales}
              translations={translation}
              onChange={handleChange}
            />
          </div>

          <LivePreview locale={previewLocale} previewPath={preview} />
        </main>
      </div>
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

  const project = context.query.project as string;
  const git = new Git(project);
  const root = env.PROJECTS_DIRECTORY.replaceAll("\\", "/");
  const pattern = `${root}/${project}/+(components|core|translations)/**/*.i18n.+(ts|tsx)`;
  const files: TranslationFiles = getFileInfo(root, project, pattern);

  return {
    props: {
      project: {
        branch: git.branch(),
        name: project,
      },
      files,
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
