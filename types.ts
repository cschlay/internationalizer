import { ReactNode } from "react";

export interface ParsedDocstring {
  description: string[];
  storybookUrls: string[];
  previewUrls: string[];
}

export interface TranslationFileContent {
  path: string;
  relativePath: string;
  name: string;
  docstring?: ParsedDocstring;
  translations: Translation;
}

// The following definitions are same in every project. Copy these to `types/Translation.ts`

export type I18nTemplate = (args: Record<string, any>) => string | ReactNode;

export type I18nTextNode = string | ReactNode | I18nTemplate;

export type LocalizedTexts = Record<string, I18nTextNode>;
export type Translation = Record<string, LocalizedTexts>;
