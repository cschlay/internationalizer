import { DOCSTRING_PREVIEW_TAG, DOCSTRING_STORYBOOK_TAG } from "../config";
import { ParsedDocstring } from "../types";

const DOCSTRING_UNIT_REGEX: RegExp = /(\/\*\*)|( \* )|( \*)/g;

export const readDocstring = (
  matches: RegExpMatchArray | null
): ParsedDocstring | undefined => {
  if (!matches) {
    return null;
  }
  const docstring: string = matches[0];

  const result: ParsedDocstring = {
    description: [],
    storybookUrls: [],
    previewUrls: [],
  };

  const cleanedLines: string[] = docstring
    .replace(DOCSTRING_UNIT_REGEX, "")
    .split("\n")
    .slice(1, -1);

  cleanedLines.forEach((line) => {
    if (line.startsWith(DOCSTRING_STORYBOOK_TAG)) {
      result.storybookUrls.push(
        line.replace(`${DOCSTRING_STORYBOOK_TAG} `, "")
      );
    } else if (line.startsWith(DOCSTRING_PREVIEW_TAG)) {
      result.previewUrls.push(line.replace(`${DOCSTRING_PREVIEW_TAG} `, ""));
    } else {
      result.description.push(line);
    }
  });
  return result;
};
