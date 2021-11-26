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
    .replace(/\({.*.}\) =>/g, "")
    // Remove react fragments with spaces (\n<>SPACES
    .replace(/\(\n\s*<>\n/g, '"')
    .replace(/<\/>\n\s*\)/g, '"')
    // The normal fragments
    .replace(/<>/g, '"')
    .replace(/<\/>/g, '"');
  let tokens = cleanedTranslation.split(" ");

  const result = {};

  let read = false;

  let key;
  let locale;
  let text = [];
  for (const token of tokens) {
    if (token === "{\n" && !read) {
      read = true;
    } else if (token !== "") {
      if (key) {
        if (locale) {
          text.push(token);
          if (token.endsWith("`,\n") || token.endsWith('",\n')) {
            const tt = text
              .join(" ")
              .replace("\n ", "")
              .replace(",\n", "")
              .replaceAll("$", "");
            result[key][locale] = tt.slice(1, tt.length - 1).trim();
            text = [];
            locale = undefined;
          }
        } else if (token === "},\n" || token === "},\n};") {
          locale = undefined;
          key = undefined;
        } else if (token !== "{\n") {
          // No locale
          locale = token.replace(":", "");
          result[key][locale] = "";
        }
      } else {
        // No key
        key = token.replace(":", "");
        result[key] = {};
      }
    }
  }

  return result;
};
