import { Translation, TranslationFileContent } from "../../types";
import { getTemplateArguments } from "./getTemplateArguments";
import { writeDocstring } from "./writeDocstring";
import { Tokens } from "../Tokens";

const INDENT = `  `;
const SEMI = `;`;

/**
 * Converts the JSON serializable translation content back to TypeScript definition.
 *
 * It automatically adds ESLint exceptions, type imports, and the interface.
 */
export const toTSX = ({
  exportName,
  content,
  docstring,
}: TranslationFileContent): string => {
  let tsx: string[] = [
    `import { I18nTemplate, Translation } from "@/types/Translation"${SEMI}\n`,
  ];

  if (docstring) {
    tsx = tsx.concat(writeDocstring(docstring));
  }

  tsx.push(`export const ${exportName}: Translation = {`);

  const [translationTsx, tsxInterface] = extractContent(content);
  tsx.push(translationTsx);
  tsx.push("}" + SEMI + "\n");
  tsx.push(`export interface ${exportName} {`);
  tsx.push(tsxInterface);
  tsx.push("}");
  return tsx.join(Tokens.NewLine);
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
      const args: string[] = getTemplateArguments(textNode);
      if (args.length > 0) {
        // Templates are always pure functions that return JSX.
        isTemplated = true;
        tsx.push(
          INDENT +
            INDENT +
            `${languageCode}: ({ ${args.join(", ")} }) => <>${textNode}</>,`
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
      tsxInterface.push(INDENT + `${key}: string` + SEMI);
    }
  }
  return [tsx.join(Tokens.NewLine), tsxInterface.join(Tokens.NewLine)];
};
