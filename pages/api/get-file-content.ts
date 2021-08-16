import fs from "fs";
import { readTranslation } from "../../utils/readTranslation";
import { TranslationFileContent } from "../../types";
import { NextApiRequest, NextApiResponse } from "next";
import { readDocstring } from "../../utils/readDocstring";

const TRANSLATION_REGEX: RegExp = /export const .*: Translation [^;]*;/gs;

/**
 * Reads a .18n.tsx file and transforms its content into JSON serializable representation.
 */
const getFileContent = (
  req: NextApiRequest,
  res: NextApiResponse<TranslationFileContent>
): Promise<null> => {
  const filePath: string = req.query.file as string;
  const absolutePath = `${process.env.NEXT_PUBLIC_PROJECT_DIRECTORY}${req.query.file}`;

  return new Promise((resolve) => {
    fs.readFile(absolutePath, "utf-8", (_, content) => {
      const translations: RegExpMatchArray = content.match(TRANSLATION_REGEX);
      // The pattern may be bad if developer manually writes multiple docstring.
      const docstring: RegExpMatchArray = content.match(/\/\*\*.*\*\//s);

      const responseData: TranslationFileContent = {
        path: absolutePath,
        relativePath: filePath,
        name: filePath.split("/").pop(),
        docstring: readDocstring(docstring),
        translations: readTranslation(translations),
      };

      res.status(200).json(responseData);
      resolve(null);
    });
  });
};

export default getFileContent;
