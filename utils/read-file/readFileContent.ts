import { Documentation, TranslationFileContent } from "../../types";
import fs from "fs";
import { parseDocstring } from "./parseDocstring";
import { readTranslation } from "./readTranslation";
import { regexGetFirst } from "../regexGetFirst";

const docstringPattern = /\/\*\*.*\*\//s;
const translationPattern = /export const .*: Translation [^;]*;/gs;
const exportPattern = /(?<=const ).*(?=(: Translation))/g;

export const readFileContent = (
  root: string,
  project: string,
  path: string,
  name: string
): TranslationFileContent => {
  const absolutePath = `${root}/${project}/${path}`;
  const content = readFile(absolutePath);
  const translation: string = regexGetFirst(content, translationPattern);
  const exportName: string = regexGetFirst(content, exportPattern);

  const configuration = fs.readFileSync(
    `${root}/${project}/translations/i18n.config.json`
  );

  return {
    name,
    absolutePath: absolutePath,
    relativePath: decodeURIComponent(path),
    docstring: getDocstring(content),
    content: readTranslation(translation),
    locales: JSON.parse(configuration.toString()).locales,
    exportName,
  };
};

const getDocstring = (content: string): Documentation => {
  const matches: RegExpMatchArray | null = content.match(docstringPattern);
  if (matches) {
    return parseDocstring(matches[0]);
  }
  return parseDocstring("");
};

const readFile = (path: string): string => {
  return fs.readFileSync(decodeURIComponent(path), "utf-8");
};
