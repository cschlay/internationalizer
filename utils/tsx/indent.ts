import { Tokens } from "../Tokens";

export const indent = (tabCount: number) => {
  const indents = [];
  for (let i = 0; i < tabCount; i++) {
    indents.push(Tokens.Indent);
  }
  return indents.join("");
};
