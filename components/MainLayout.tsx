import css from "./MainLayout.module.css";
import Head from "next/head";
import { FileListing } from "./FileListing";
import { ProjectDetails, TranslationFiles } from "../types";
import { ReactNode } from "react";
import { GitToolBar } from "./GitToolBar";

interface Props {
  children: ReactNode;
  files: TranslationFiles;
  project: ProjectDetails;
}

export const MainLayout = ({ children, files, project }: Props) => {
  return (
    <div className={css.MainLayout}>
      <Head>
        <title>Internationalizer</title>
      </Head>
      <div className={css.SideBar}>
        <FileListing data={files} />
        <GitToolBar project={project} />
      </div>

      {children}
    </div>
  );
};
