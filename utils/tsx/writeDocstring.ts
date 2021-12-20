import { Documentation } from "../../types";
import { Tokens } from "../Tokens";

export const writeDocstring = ({
  description,
  stories,
  previews,
}: Documentation): string[] => {
  const content = description
    .map((line) => ` * ${line}`)
    .concat(stories.map((url) => ` * ${Tokens.StorybookStory} ${url}`))
    .concat(previews.map((url) => ` * ${Tokens.Preview} ${url}`));

  return ["/**", ...content, " */"];
};
