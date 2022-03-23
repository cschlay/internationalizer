import { APP_HOST, STORYBOOK_HOST } from "../../app.config";

/**
 * Formats the url so that they can be opened in browsers.
 * It prepends STORYBOOK_HOST or APP_HOST to the url and appends the locale to storybook url parameters.
 */
export const buildPreviewUrl = (path: string, locale: string): string => {
  if (!path || !locale) {
    return "";
  }

  const slash: string = path[0] === "/" ? "" : "/";
  if (isStorybook(path)) {
    return `${STORYBOOK_HOST}${slash}${path}&locale=${locale}`;
  }

  return `${APP_HOST}/${locale}${slash}${path}`;
};

const isStorybook = (url: string) => {
  return url.startsWith("iframe") || url.startsWith("/iframe");
};
