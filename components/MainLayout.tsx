import css from "./MainLayout.module.css";
import Head from "next/head";
import { FileListing } from "./FileListing";
import { TranslationFiles } from "../types";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  files: TranslationFiles;
}

export const MainLayout = ({ children, files }: Props) => {
  return (
    <div className={css.MainLayout}>
      <Head>
        <title>Internationalizer</title>
      </Head>
      <FileListing data={files} />
      {children}
    </div>
  );
};
