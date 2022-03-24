import { Translation, TranslationFileContent } from "../../types";
import { toTSX } from "./toTSX";

const exportName = "TestI18n";

const getData = (content: Translation): TranslationFileContent => {
  return {
    content,
    exportName,
    docstring: {
      description: [],
      stories: [],
      previews: [],
    },
    locales: [],
    name: "",
    absolutePath: "",
    relativePath: "",
  };
};

describe("Conversion to TSX", () => {
  it("should add structure for empty file", () => {
    const data: TranslationFileContent = {
      content: {},
      exportName,
      docstring: {
        description: [],
        stories: [],
        previews: [],
      },
      locales: [],
      name: "",
      absolutePath: "",
      relativePath: "",
    };
    const tsx = toTSX(data);

    expect(tsx).toEqual(
      [
        `import { I18nTemplate, Translation } from "@/types/Translation";`,
        "",
        "/**",
        " */",
        `export const ${exportName}: Translation = {`,
        "",
        "};",
        "",
        `export interface ${exportName} {`,
        "",
        "}",
      ].join("\n")
    );
  });

  it("should add one locale", () => {
    const data = getData({
      key: {
        en: "test",
      },
    });
    const tsx = toTSX(data);
    expect(tsx).toEqual(
      [
        `import { I18nTemplate, Translation } from "@/types/Translation";`,
        "",
        "/**",
        " */",
        `export const ${exportName}: Translation = {`,
        "  key: {",
        `    en: "test",`,
        "  },",
        "};",
        "",
        `export interface ${exportName} {`,
        "  key: string;",
        "}",
      ].join("\n")
    );
  });

  it("should add multiple locale", () => {
    const data = getData({
      key: {
        en: "english",
        fi: "finnish",
      },
    });

    const tsx = toTSX(data);
    expect(tsx).toEqual(
      [
        `import { I18nTemplate, Translation } from "@/types/Translation";`,
        "",
        "/**",
        " */",
        `export const ${exportName}: Translation = {`,
        "  key: {",
        `    en: "english",`,
        `    fi: "finnish",`,
        "  },",
        "};",
        "",
        `export interface ${exportName} {`,
        "  key: string;",
        "}",
      ].join("\n")
    );
  });

  it("should add multiple records", () => {
    const data = getData({
      one: {
        en: "one",
      },
      two: {
        en: "two",
      },
    });

    const tsx = toTSX(data);
    expect(tsx).toEqual(
      [
        `import { I18nTemplate, Translation } from "@/types/Translation";`,
        "",
        "/**",
        " */",
        `export const ${exportName}: Translation = {`,
        "  one: {",
        `    en: "one",`,
        "  },",
        "  two: {",
        `    en: "two",`,
        "  },",
        "};",
        "",
        `export interface ${exportName} {`,
        "  one: string;",
        "  two: string;",
        "}",
      ].join("\n")
    );
  });

  it("should convert templates using JSX", () => {
    const data = getData({
      key: {
        en: "Hello {name}!",
      },
    });

    const tsx = toTSX(data);
    expect(tsx).toEqual(
      [
        `import { I18nTemplate, Translation } from "@/types/Translation";`,
        "",
        "/**",
        " */",
        `export const ${exportName}: Translation = {`,
        "  key: {",
        `    en: ({ name }) => <>Hello {name}!</>,`,
        "  },",
        "};",
        "",
        `export interface ${exportName} {`,
        "  key: I18nTemplate;",
        "}",
      ].join("\n")
    );
  });

  it("should write html into JSX", () => {
    const data = getData({
      key: {
        en: "Hello <strong>{name}</strong>!",
      },
    });

    const tsx = toTSX(data);
    expect(tsx).toEqual(
      [
        `import { I18nTemplate, Translation } from "@/types/Translation";`,
        "",
        "/**",
        " */",
        `export const ${exportName}: Translation = {`,
        "  key: {",
        `    en: ({ name }) => <>Hello <strong>{name}</strong>!</>,`,
        "  },",
        "};",
        "",
        `export interface ${exportName} {`,
        "  key: I18nTemplate;",
        "}",
      ].join("\n")
    );
  });
});
