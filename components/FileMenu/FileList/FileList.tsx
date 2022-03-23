import { ComponentMeta, PageMeta } from "../../../types";
import { SyntheticEvent } from "react";
import css from "./FileList.module.css";
import { useRouter } from "next/router";

interface Props {
  data: Array<ComponentMeta | PageMeta>;
  onSelect: (event: SyntheticEvent<HTMLLIElement>) => void;
}

export const FileList = ({ data, onSelect }: Props) => {
  const router = useRouter();

  return (
    <ul className={css.FileList}>
      {data.map((file) => (
        <li
          key={file.path}
          data-active={router.query.name === file.name}
          data-name={file.name}
          data-path={file.path}
          onClick={onSelect}
        >
          {file.name}
        </li>
      ))}
    </ul>
  );
};
