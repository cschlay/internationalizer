import { ReactNode } from "react";

export interface Documentation {
  description: string[];
  stories: string[];
  previews: string[];
}

export interface FileInfo {
  name: string;
  path: string;
}

export interface TranslationFileContent {
  absolutePath: string;
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

export type TranslationFiles = Record<string, FileInfo[]>;

export interface ProjectDetails {
  branch: string;
  name: string;
}

// The following definitions are the same in every project. Copy these to `types/Translation.ts`

export type I18nTemplate = (args: Record<string, never>) => string | ReactNode;
export type I18nTextNode = string | ReactNode | I18nTemplate;
export type LocalizedTexts = Record<string, string>;
export type Translation = Record<string, LocalizedTexts>;
