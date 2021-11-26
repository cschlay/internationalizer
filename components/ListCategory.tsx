import { SyntheticEvent } from "react";
import styles from "./FileListing.module.css";
import { ComponentMeta, PageMeta } from "../types";

interface ListingProps {
  data: Array<ComponentMeta | PageMeta>;
  onOpen: (event: SyntheticEvent<HTMLLIElement>) => void;
}

export const ListCategory = ({ data, onOpen }: ListingProps) => {
  return (
    <ul className={styles.Listing}>
      {data.map((file) => (
        <li
          key={file.path}
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
