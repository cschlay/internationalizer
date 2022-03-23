/**
 * Returns the first instance found using regex, it will return empty string if not found.
 *
 * @param value the to look from
 * @param pattern to match
 */
export const regexGetFirst = (value: string, pattern: RegExp): string => {
  const matches = value.match(pattern);
  if (matches) {
    return matches[0];
  }

  return "";
};
