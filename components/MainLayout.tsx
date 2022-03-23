import { ProjectDetails, TranslationFiles } from "../types";
import { FileMenu } from "./FileMenu/FileMenu";
import { GitTools } from "./GitTools/GitTools";
import Head from "next/head";
import { ReactNode } from "react";
import css from "./MainLayout.module.css";

interface Props {
  children: ReactNode;
  files: TranslationFiles;
  project: ProjectDetails;
}

export const MainLayout = ({ children, files, project }: Props) => {
  return (
    <div className={css.MainLayout}>
      <Head>
        <title>Internationalizer - {project.name}</title>
      </Head>
      <div className={css.SideBar}>
        <FileMenu data={files} />
        <GitTools project={project} />
      </div>

      {children}
    </div>
  );
};
