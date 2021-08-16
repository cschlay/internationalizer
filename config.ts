export const DOCSTRING_STORYBOOK_TAG: string = "@storybook";
export const DOCSTRING_PREVIEW_TAG: string = "@preview";
export const FRONTEND_HOST: string = "http://localhost:3000";
export const STORYBOOK_HOST: string = "http://localhost:6006";

export const LANGUAGES: string[] =
  process.env.NEXT_PUBLIC_LANGUAGES.split(",").sort();
