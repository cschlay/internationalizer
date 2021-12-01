import { APP_HOST, STORYBOOK_HOST } from "../app.config";

/**
 * Formats the url so that they can be opened in browsers.
 * It prepends STORYBOOK_HOST or APP_HOST to the url and appends "lang" parameter.
 */
export const formatPreviewUrl = (relativeUrl: string): string => {
  if (!relativeUrl) {
    return "";
  }

  // Storybook urls starts with word iframe, no other urls should have same.
  const host: string = relativeUrl.startsWith("iframe")
    ? STORYBOOK_HOST
    : APP_HOST;

  // Sometimes developers are accustomed to append the slash, and sometimes not.
  const slash: string = relativeUrl[0] === "/" ? "" : "/";

  const hasQueryString: boolean = relativeUrl.indexOf("?") !== -1;
  const separator: string = hasQueryString ? "&" : "?";

  return `${host}${slash}${relativeUrl}${separator}`;
};
