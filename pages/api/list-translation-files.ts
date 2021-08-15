import glob from "glob";
import { NextApiRequest, NextApiResponse } from "next";

const PROJECT_ROOT: string = process.env.NEXT_PUBLIC_PROJECT_DIRECTORY;

// The supported patterns can be found at https://www.npmjs.com/package/glob.
const TRANSLATION_PATTERN = `${PROJECT_ROOT}/+(components|core|translations)/**/*.i18n.+(ts|tsx)`;

/**
 * Retrieves a list of all translation files that have .i18n.tsx or .i18n.ts as extension.
 * The default lookup pattern is simple so that the lookup is fast.
 */
const listTranslationFiles = (
  req: NextApiRequest,
  res: NextApiResponse<string[]>
): Promise<null> => {
  return new Promise((resolve) => {
    glob(TRANSLATION_PATTERN, {}, (_, files: string[]) => {
      const cleanedFiles = files.map((f) => f.replace(PROJECT_ROOT, ""));
      res.status(200).json(cleanedFiles);
      resolve(null);
    });
  });
};

export default listTranslationFiles;
