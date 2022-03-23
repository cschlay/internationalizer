import {
  ProjectDetails,
  Translation,
  TranslationFileContent,
  TranslationFiles,
} from "../../types";
import { useCallback, useEffect, useState } from "react";
import { DocStringPreview } from "../../components/DocString/DocStringPreview";
import { EditView } from "../../components/EditView/EditView";
import { GetServerSideProps } from "next";
import { Git } from "../../utils/git";
import { LivePreview } from "../../components/LivePreview/LivePreview";
import { MainLayout } from "../../components/MainLayout";
import { ToolBar } from "../../components/ToolBar/ToolBar";
import css from "./[project].module.css";
import { env } from "../../utils/env";
import glob from "glob";
import { isAuthenticated } from "../../utils/authentication";
import { readFileContent } from "../../utils/readFileContent";
import { toTSX } from "../../utils/tsx/toTSX";
import { useCtrlSaveEffect } from "../../hooks/useCtrlSaveEffect";
import { usePendingChanges } from "../../hooks/usePendingChanges";

interface Props {
  project: ProjectDetails;
  files: TranslationFiles;
  content?: TranslationFileContent;
}

const SessionPage = ({ project, files, content }: Props) => {
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
  }, [content, project.name, translation]);

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
        {content.path && (
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

  const { project } = context.query;
  const git = new Git(project as string);
  const root = env.PROJECTS_DIRECTORY.replaceAll("\\", "/");
  const pattern = `${root}/${project}/+(components|core|translations)/**/*.i18n.+(ts|tsx)`;
  const files: string[] = glob.sync(pattern, {});

  const data = {};

  files.forEach((file) => {
    const path = file.replace(`${root}/${project}/`, "");
    const [, category, ...parts] = path.split("/");

    const fileName = parts[parts.length - 1];

    // TODO: Move these files
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
