/**
 * Add spaces between each word in PascalCased name.
 */
export const addSpacesBetween = (value: string) => {
  return value.replace(/([A-Z])/g, " $1");
};
