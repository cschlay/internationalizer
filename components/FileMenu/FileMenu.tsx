import { FileList } from "./FileList/FileList";
import { SyntheticEvent } from "react";
import { TranslationFiles } from "../../types";
import css from "./FileMenu.module.css";
import { useRouter } from "next/router";

interface Props {
  data: TranslationFiles;
}

export const FileMenu = ({ data }: Props) => {
  const router = useRouter();

  const handleFileSelect = async (event: SyntheticEvent<HTMLLIElement>) => {
    const { path, name } = event.currentTarget.dataset;
    if (path && name) {
      await router.push({
        pathname: router.pathname,
        query: {
          file: encodeURIComponent(path),
          name: encodeURIComponent(name),
          project: router.query.project,
        },
      });
    } else {
      console.error(`The file is not defined: path=${path} name=${name}!`);
    }
  };

  return (
    <div className={`${css.FileMenu} scrollbar`}>
      <h2>Components</h2>
      <FileList data={data.components} onSelect={handleFileSelect} />

      <h2>Pages</h2>
      <FileList data={data.pages} onSelect={handleFileSelect} />
    </div>
  );
};
