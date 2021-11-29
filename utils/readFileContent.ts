import fs from "fs";
import { TranslationFileContent } from "../types";
import { readDocstring } from "./readDocstring";
import { readTranslation } from "./readTranslation";

const DOCSTRING_REGEX: RegExp = /\/\*\*.*\*\//s;
const TRANSLATION_REGEX: RegExp = /export const .*: Translation [^;]*;/gs;

export const readFileContent = (
  root: string,
  project: string,
  path: string,
  name: string
): TranslationFileContent => {
  const absolutePath = `${root}/${project}/${path}`;

  const content = fs.readFileSync(decodeURIComponent(absolutePath), "utf-8");
  const [translation]: RegExpMatchArray = content.match(TRANSLATION_REGEX);
  const docstring: RegExpMatchArray = content.match(DOCSTRING_REGEX);

  const config = fs.readFileSync(
    `${root}/${project}/translations/i18n.config.json`
  );

  return {
    path: absolutePath,
    relativePath: decodeURIComponent(path),
    name,
    docstring: readDocstring(docstring),
    content: translation ? readTranslation(translation) : {},
    locales: JSON.parse(config.toString()).locales,
  };
};
