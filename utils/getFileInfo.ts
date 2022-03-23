import { FileInfo, TranslationFiles } from "../types";
import glob from "glob";

export const getFileInfo = (
  root: string,
  project: string,
  pattern: string
): TranslationFiles => {
  const filePaths: string[] = glob.sync(pattern, {});

  const files: TranslationFiles = {
    components: [],
    pages: [],
  };

  filePaths.forEach((file) => {
    const path = file.replace(`${root}/${project}/`, "");
    const [, category, ...parts] = path.split("/");

    if (!files[category]) {
      files[category] = [];
    }
    const info = buildFileInfo(path, parts);
    files[category].push(info);
  });

  return files;
};

const buildFileInfo = (path: string, parts: string[]): FileInfo => {
  const name = parts[parts.length - 1];

  if (name.endsWith(".i18n.tsx")) {
    return {
      name: name.replace(".i18n.tsx", ""),
      path,
    };
  }

  return {
    name,
    path,
  };
};
