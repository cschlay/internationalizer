import { ComponentMeta, PageMeta } from "../types";
import { SyntheticEvent } from "react";
import css from "./ListCategory.module.css";
import { useRouter } from "next/router";

interface ListingProps {
  data: Array<ComponentMeta | PageMeta>;
  onOpen: (event: SyntheticEvent<HTMLLIElement>) => void;
}

export const ListCategory = ({ data, onOpen }: ListingProps) => {
  const router = useRouter();

  return (
    <ul className={css.ListCategory} tabIndex={0}>
      {data.map((file) => (
        <li
          key={file.path}
          data-active={router.query.name === file.name}
          data-name={file.name}
          data-path={file.path}
          onClick={onOpen}
        >
          {file.name}
        </li>
      ))}
    </ul>
  );
};
