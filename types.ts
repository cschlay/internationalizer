import { ReactNode } from "react";

export interface Documentation {
  description: string[];
  stories: string[];
  previews: string[];
}

export interface TranslationFileContent {
  path: string;
  relativePath: string;
  name: string;
  docstring: Documentation;
  content: Translation;
  locales: string[];
  exportName: string;
}

export interface User {
  username: string;
  password: string;
  token?: string;
}

export interface ComponentMeta {
  path: string;
  name: string;
}

export interface PageMeta {
  path: string;
  name: string;
  url: string;
}

export interface TranslationFiles {
  components: ComponentMeta[];
  pages: PageMeta[];
}

export interface ProjectDetails {
  branch: string;
  name: string;
}

// The following definitions are same in every project. Copy these to `types/Translation.ts`

export type I18nTemplate = (args: Record<string, any>) => string | ReactNode;

export type I18nTextNode = string | ReactNode | I18nTemplate;

export type LocalizedTexts = Record<string, string>;
export type Translation = Record<string, LocalizedTexts>;
