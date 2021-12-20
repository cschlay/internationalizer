type CssClassDefinition = string | [string, ...boolean[]];

/**
 * Use together with useMemo.
 */
export const getClassName = (...cssClasses: CssClassDefinition[]): string => {
  return cssClasses.map(mapper).join(" ");
};

const mapper = (cssClass: CssClassDefinition): string | undefined => {
  if (typeof cssClass === "string") {
    return cssClass;
  }

  const [className, ...conditions] = cssClass;

  if (conditions.includes(true)) {
    return className;
  }

  return undefined;
};
