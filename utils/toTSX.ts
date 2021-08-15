import { Translation, TranslationFileContent } from "../types";

const INDENT = `    `;
const SEMI = `;`;

/**
 * Converts the JSON serializable translation content back to TypeScript definition.
 *
 * It automatically adds ESLint exceptions, type imports, and the interface.
 */
export const toTSX = (content: TranslationFileContent): string => {
  const tsx: string[] = [
    "/* eslint-disable react/display-name */",
    `import { I18nTemplate, I18nTextNode, Translation } from "@/types/Translation"${SEMI}\n`,
  ];
  const [objectName]: string[] = content.name.split(".");
  tsx.push(`export const ${objectName}I18n: Translation = {`);

  const [translationTsx, tsxInterface] = extractContent(content.translations);
  tsx.push(translationTsx);
  tsx.push("}" + SEMI + "\n");
  tsx.push(`export interface I18nContent {`);
  tsx.push(tsxInterface);
  tsx.push("}");
  return tsx.join("\n");
};

/**
 * Extracts the translation into TSX string and respective interface.
 */
const extractContent = (content: Translation): string[] => {
  const tsx: string[] = [];
  const tsxInterface: string[] = [];

  for (const [key, texts] of Object.entries(content)) {
    tsx.push(INDENT + `${key}: {`);

    let isTemplated: boolean = false;
    for (const [languageCode, textNode] of Object.entries(texts)) {
      const args: string = extractTemplateArguments(textNode as string);
      if (args) {
        // Templates are always pure functions that return JSX.
        isTemplated = true;
        tsx.push(
          INDENT +
            INDENT +
            `${languageCode}: ({ ${args} }) => <>${textNode}</>,`
        );
      } else {
        // Non-templates are strings.
        tsx.push(INDENT + INDENT + `${languageCode}: "${textNode}",`);
      }
    }
    tsx.push(INDENT + "},");

    if (isTemplated) {
      tsxInterface.push(INDENT + `${key}: I18nTemplate` + SEMI);
    } else {
      tsxInterface.push(INDENT + `${key}: I18nTextNode` + SEMI);
    }
  }
  return [tsx.join("\n"), tsxInterface.join("\n")];
};

/**
 * Extracts template arguments from TextNode. If it doesn't have any it will return an empty string.
 *
 * The return format doesn't contain parenthesis: "arg1, arg2, arg3"
 */
const extractTemplateArguments = (textNode: string): string => {
  // Matches every string wrapped in braces "{hello}".
  const args: RegExpMatchArray = textNode.match(/{.*}/g);
  if (args) {
    return args
      .map((arg) => arg.replace(/{/g, "").replace(/}/g, ""))
      .join(", ");
  }

  return "";
};
