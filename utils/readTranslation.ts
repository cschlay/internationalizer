import { Translation } from "../types";
import { Cleanable } from "./cleanTranslation";
import { Tokens } from "./Tokens";

/**
 * Converts Translation string representation, so it will be read and converted into JavaScript object.
 * It accepts a list of translations but current implementation only returns one.
 *
 * WARNING: Only for trusted local use, it uses "eval" to convert.
 */
export const readTranslation = (translation: string): Translation => {
  const cleanedTranslation: string = new Cleanable(translation)
    .removeExport()
    .removeComments()
    .replaceArrows()
    .replaceReactFragments()
    .toString();

  const tokens = cleanedTranslation
    .split(Tokens.WhiteSpace)
    .filter((token) => token && token !== Tokens.GroupBegin);
  return readTokens(tokens);
};

const readTokens = (tokens: string[]): Translation => {
  const result: Translation = {};

  let key = "";
  let locale = "";
  let textValue = [];
  for (const token of tokens) {
    if (token.includes(Tokens.Termination)) {
      return result;
    }

    if (key) {
      if (locale) {
        textValue.push(token);
        if (token.endsWith(Tokens.LocaleTerminator)) {
          result[key][locale] = formatTextValue(textValue);
          textValue = [];
          locale = undefined;
        }
      } else if (token === Tokens.KeyTerminator) {
        locale = undefined;
        key = undefined;
      } else {
        locale = token.replace(":", "");
        result[key][locale] = {};
      }
    } else {
      key = token.replace(Tokens.KeyValueSeparator, "");
      result[key] = {};
    }
  }

  return result;
};

const formatTextValue = (textValue: string[]): string => {
  const text = textValue
    .join(Tokens.WhiteSpace)
    .replace(Tokens.StringLineTermination, '"')
    .replace("\n ", "")
    .replaceAll("$", "");
  return text.slice(1, text.length - 1).trim();
};
