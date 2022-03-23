import { Documentation } from "../../types";
import { Tokens } from "../Tokens";

export const parseDocstring = (docstring: string): Documentation => {
  const lines: string[] = docstring
    .replace(Tokens.Docstring, "")
    .split(Tokens.NewLine)
    .slice(1, -1);

  return lines.reduce(reducer, { description: [], stories: [], previews: [] });
};

const reducer = (result: Documentation, line: string) => {
  if (line.includes(Tokens.StorybookStory)) {
    result.stories.push(line.replace(Tokens.StorybookStory, "").trim());
  } else if (line.includes(Tokens.Preview)) {
    result.previews.push(line.replace(Tokens.Preview, "").trim());
  } else {
    result.description.push(line.trim());
  }
  return result;
};
