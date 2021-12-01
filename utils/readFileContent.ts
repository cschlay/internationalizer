import fs from "fs";
import { Documentation, TranslationFileContent } from "../types";
import { parseDocstring } from "./parseDocstring";
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

  const configuration = fs.readFileSync(
    `${root}/${project}/translations/i18n.config.json`
  );

  const [exportName] = translation.match(/(?<=const ).*(?=(: Translation))/g);

  return {
    path: absolutePath,
    relativePath: decodeURIComponent(path),
    name,
    docstring: getDocstring(content),
    content: translation ? readTranslation(translation) : {},
    locales: JSON.parse(configuration.toString()).locales,
    exportName,
  };
};

const getDocstring = (content: string): Documentation => {
  const matches: RegExpMatchArray = content.match(DOCSTRING_REGEX);
  if (matches) {
    return parseDocstring(matches[0]);
  }
  return parseDocstring("");
};
