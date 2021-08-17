import {
  CategorizedFiles,
  categorizeFiles,
  FileMeta,
} from "../utils/categorizeFiles";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import styles from "./FileListing.module.css";

interface Props {
  activeFilePath: string;
}

export const FileListing = ({ activeFilePath }: Props) => {
  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);

  const handleFileSelect = async (event: SyntheticEvent<HTMLLIElement>) => {
    await router.push(
      `?file=${encodeURIComponent(event.currentTarget.dataset.path)}`,
      undefined,
      {
        shallow: true,
      }
    );
  };

  const categorized = useMemo<CategorizedFiles>(
    () => categorizeFiles(files),
    [files]
  );

  useEffect(() => {
    fetch("/api/list-translation-files")
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  return (
    <div className={styles.Container}>
      <h2>Components</h2>
      <Listing
        activeFilePath={activeFilePath}
        listable={categorized.components}
        onSelect={handleFileSelect}
      />
      <h2>Pages</h2>
      <Listing
        activeFilePath={activeFilePath}
        listable={categorized.pages}
        onSelect={handleFileSelect}
      />

      <h2>Miscellaneous</h2>
      <Listing
        activeFilePath={activeFilePath}
        listable={categorized.miscellaneous}
        onSelect={handleFileSelect}
      />
    </div>
  );
};

interface ListingProps {
  activeFilePath: string;
  listable: FileMeta[];
  onSelect: (event: SyntheticEvent<HTMLLIElement>) => void;
}
const Listing = ({ activeFilePath, listable, onSelect }: ListingProps) => {
  return (
    <ul className={styles.Listing}>
      {listable.map((file) => (
        <FileListingRecord
          key={file.name}
          activeFilePath={activeFilePath}
          file={file}
          onClick={onSelect}
        />
      ))}
    </ul>
  );
};

interface FileListingRecordProps {
  activeFilePath: string;
  file: FileMeta;
  onClick: (event: SyntheticEvent<HTMLLIElement>) => void;
}
const FileListingRecord = ({
  activeFilePath,
  file,
  onClick,
}: FileListingRecordProps) => {
  return (
    <li
      className={styles.ListingRecord}
      data-active={file.path === activeFilePath}
      data-path={file.path}
      onClick={onClick}
    >
      {file.name}
    </li>
  );
};
