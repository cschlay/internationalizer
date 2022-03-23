import { SyntheticEvent } from "react";
import { useRouter } from "next/router";
import styles from "./FileListing.module.css";
import { TranslationFiles } from "../types";
import { ListCategory } from "./ListCategory";

interface Props {
  data: TranslationFiles;
}

export const FileListing = ({ data }: Props) => {
  const router = useRouter();

  const handleOpen = async (event: SyntheticEvent<HTMLLIElement>) => {
    await router.push({
      pathname: router.pathname,
      query: {
        file: encodeURIComponent(event.currentTarget.dataset.path),
        name: encodeURIComponent(event.currentTarget.dataset.name),
        project: router.query.project,
      },
    });
  };

  return (
    <div className={`${styles.FileList} scrollbar`}>
      <h2>Components</h2>
      <ListCategory data={data.components} onOpen={handleOpen} />

      <h2>Pages</h2>
      <ListCategory data={data.pages} onOpen={handleOpen} />
    </div>
  );
};
