/**
 * Add spaces between each word in PascalCased name.
 *
 * @see https://stackoverflow.com/a/25452019
 */
export const addSpacesBetween = (value: string) => {
  return value
    .replace(" ", "")
    .replace(/([A-Z])/g, " $1")
    .trim();
};
