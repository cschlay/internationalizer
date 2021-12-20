import { LocalizedTexts, Translation } from "../../types";
import { getTemplateArguments } from "./getTemplateArguments";
import { indent } from "./indent";

export const writeTranslation = (content: Translation): string[][] => {
  let tsx: string[] = [];
  const tsxInterface: string[] = [];

  for (const [key, localeSet] of Object.entries(content)) {
    const templateArguments: string[] = getTemplateArguments(localeSet["en"]);
    tsxInterface.push(writeInterface(key, templateArguments));
    tsx = tsx.concat(writeLocaleSet(key, templateArguments, localeSet));
  }

  return [tsx, tsxInterface];
};

const writeInterface = (key: string, templateArguments: string[]) => {
  if (templateArguments.length > 0) {
    return indent(1) + `${key}: I18nTemplate;`;
  }
  return indent(1) + `${key}: string;`;
};

const writeLocaleSet = (
  key: string,
  templateArguments: string[],
  localeSet: LocalizedTexts
): string[] => {
  const isTemplate = templateArguments.length > 0;

  const result = Object.entries(localeSet).map(([locale, text]) => {
    if (isTemplate) {
      return (
        indent(2) +
        `${locale}: ({ ${templateArguments.join(", ")} }) => <>${text}</>,`
      );
    }
    return indent(2) + `${locale}: "${text}",`;
  });

  return [indent(1) + `${key}: {`, ...result, indent(1) + "},"];
};
