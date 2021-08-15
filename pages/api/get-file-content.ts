import fs from "fs";
import { readTranslation } from "../../utils/readTranslation";
import { Translation } from "../../types";

const TRANSLATION_REGEX: RegExp = /export const .*: Translation [^;]*;/gs;

/**
 * Reads a .18n.tsx file and transforms its content into JSON serializable representation.
 */
const getFileContent = (req, res): Promise<TranslationFileContent> => {
  const filePath: string = req.query.file;
  const absolutePath = `${process.env.NEXT_PUBLIC_PROJECT_DIRECTORY}${req.query.file}`;

  return new Promise((resolve) => {
    fs.readFile(absolutePath, "utf-8", (_, content) => {
      const translations: RegExpMatchArray = content.match(TRANSLATION_REGEX);
      const responseData: TranslationFileContent = {
        path: absolutePath,
        relativePath: filePath,
        name: filePath.split("/").pop(),
        translations: readTranslation(translations),
      };

      res.status(200).json(responseData);
      resolve(null);
    });
  });
};

interface TranslationFileContent {
  path: string;
  relativePath: string;
  name: string;
  translations: Translation;
}

export default getFileContent;
