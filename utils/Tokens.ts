export const Tokens = {
  GroupBegin: "{\n",
  KeyValueSeparator: ":",
  KeyTerminator: "},\n",
  LocaleTerminator: ",\n",
  Indent: `  `,
  NewLine: "\n",
  StringLineTermination: /(["`]),\n/,
  Termination: "};",
  WhiteSpace: " ",
  Docstring: /\/\*\*|(?<=\s)\*\/?/g,
  StorybookStory: "@storybook",
  Preview: "@preview",
};
