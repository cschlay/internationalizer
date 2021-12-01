export const Tokens = {
  GroupBegin: "{\n",
  KeyValueSeparator: ":",
  KeyTerminator: "},\n",
  LocaleTerminator: ",\n",
  NewLine: "\n",
  StringLineTermination: /(["`]),\n/,
  Termination: "};",
  WhiteSpace: " ",
  Docstring: /\/\*\*|(?<=\s)\*\/?/g,
  StorybookStory: "@storybook",
  Preview: "@preview",
};
