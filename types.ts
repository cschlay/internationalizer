import { ReactNode } from "react";

export type I18nTemplate = (args: Record<string, any>) => string | ReactNode;

export type I18nTextNode = string | ReactNode | I18nTemplate;

export type LocalizedTexts = Record<string, I18nTextNode>;
export type Translation = Record<string, LocalizedTexts>;
