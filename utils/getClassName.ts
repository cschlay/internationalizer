type CssClassDefinition = string | unknown;

/**
 * Returns a simple string of class. You can use it as getClassName("cls", condition && "cls-1") for conditional classes.
 */
export const getClassName = (...cssClasses: CssClassDefinition[]): string => {
  return cssClasses
    .map(mapper)
    .filter((x) => x)
    .join(" ");
};

const mapper = (cssClass: CssClassDefinition): string | undefined => {
  return typeof cssClass === "string" ? cssClass : undefined;
};
