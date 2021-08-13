import styles from "./FileListing.module.css";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";

interface Props {
  activeFilePath: string;
  onFileSelected: (filepath: string) => void;
}

export const FileListing = ({ activeFilePath, onFileSelected }: Props) => {
  const [files, setFiles] = useState<string[]>([]);

  const handleFileSelect = (event: SyntheticEvent<HTMLLIElement>) => {
    console.log(event.currentTarget.dataset);
    onFileSelected(event.currentTarget.dataset.path);
  };

  const categorized = useMemo<CategorizedFiles>(() => {
    const result: CategorizedFiles = {
      components: [],
      pages: [],
      miscellaneous: [],
    };
    files.forEach((filepath) => {
      const parts = filepath.split("/");
      if (parts.includes("pages")) {
        const url = filepath.split("pages")[1].replace(".i18n.tsx", "");
        result.pages.push({
          name: url,
          path: filepath,
        });
      } else if (parts.includes("components")) {
        result.components.push({
          // Omits the prefix /components, and the duplicate part FileName/FileName.i18n.ts
          name: parts.slice(2, -1).join("/"),
          path: filepath,
        });
      } else {
        result.miscellaneous.push({
          name: parts[parts.length - 1],
          path: filepath,
        });
      }
    });
    return result;
  }, [files]);

  useEffect(() => {
    fetch("/api/list-translation-files")
      .then((res) => res.json())
      .then(setFiles);
  }, []);

  return (
    <div className={styles.Container}>
      <h2>Components</h2>
      <ul className={styles.Listing}>
        {categorized.components.map((component) => (
          <FileListingRecord
            key={component.name}
            activeFilePath={activeFilePath}
            file={component}
            onClick={handleFileSelect}
          />
        ))}
      </ul>
      <h2>Pages</h2>
      <ul className={styles.Listing}>
        {categorized.pages.map((page) => (
          <FileListingRecord
            key={page.name}
            activeFilePath={activeFilePath}
            file={page}
            onClick={handleFileSelect}
          />
        ))}
      </ul>

      <h2>Miscellaneous</h2>
      <ul className={styles.Listing}>
        {categorized.miscellaneous.map((file) => (
          <FileListingRecord
            key={file.name}
            activeFilePath={activeFilePath}
            file={file}
            onClick={handleFileSelect}
          />
        ))}
      </ul>
    </div>
  );
};

interface FileListingRecordProps {
  activeFilePath: string;
  file: Meta;
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

interface Meta {
  name: string;
  path: string;
}

interface CategorizedFiles {
  components: Meta[];
  pages: Meta[];
  miscellaneous: Meta[];
}
