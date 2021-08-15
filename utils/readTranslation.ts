import { Translation } from "../types";

/**
 * Converts Translation string representation, so it will be read and converted into JavaScript object.
 * It accepts a list of translations but current implementation only returns one.
 *
 * WARNING: Only for trusted local use, it uses "eval" to convert.
 */
export const readTranslation = (
  translations: RegExpMatchArray
): Translation => {
  if (!translations || translations.length === 0) {
    return {};
  }

  const cleanedTranslation: string = translations[0]
    .replace(/export const .*: Translation = /gs, "")
    .replace(/\(.*\) => /g, "")
    .replace(/<>/g, '"')
    .replace(/<\/>/g, '"');

  let result;
  eval("result = " + cleanedTranslation);
  return result;
};
