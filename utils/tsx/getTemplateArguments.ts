export const getTemplateArguments = (text: string): string[] => {
  const args: RegExpMatchArray | null = text.match(/{[a-zA-Z\d]*}/g);
  if (args) {
    return args.map((arg) => arg.replace(/[{}]/g, ""));
  }

  return [];
};
