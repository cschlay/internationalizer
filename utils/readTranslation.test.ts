import { readTranslation } from "./readTranslation";

describe("Translation parse", () => {
  it("should handle strings", () => {
    const example = `export const TestI18n: Translation = {
      test: {
        en: "ship",
      },
    };`;

    const result = readTranslation(example);
    expect(result).toEqual({
      test: { en: "ship" },
    });
  });

  it("should handle multiple locales", () => {
    const example = `export const TestI18n: Translation = {
      test: {
        en: "english",
        fi: "finnish",
      },
    };`;

    const result = readTranslation(example);
    expect(result).toEqual({ test: { en: "english", fi: "finnish" } });
  });

  describe("React elements", () => {
    it("should handle one line fragments", () => {
      const example = `export const TestI18n: Translation = {
        test: {
          en: ({ price }) => <>it costs {price}</>,
        },
      };`;

      const result = readTranslation(example);
      expect(result).toEqual({ test: { en: "it costs {price}" } });
    });

    it("should handle multiline fragments", () => {
      const example = `export const TestI18n: Translation = {
        test: {
          en: ({ one }) => (
            <>
              it works {one}
            </>
          ),
        },
      };`;

      const result = readTranslation(example);
      expect(result).toEqual({
        test: {
          en: "it works {one}",
        },
      });
    });
  });
});
