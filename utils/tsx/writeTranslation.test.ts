import { Translation } from "../../types";
import { writeTranslation } from "./writeTranslation";

describe("Translation write", () => {
  it("should detect template by english", () => {
    const data: Translation = {
      key: {
        en: "templated {amount}",
        fi: "invalid",
      },
    };

    const [tsx, tsxInterface] = writeTranslation(data);
    expect(tsx).toEqual([
      "  key: {",
      "    en: ({ amount }) => <>templated {amount}</>,",
      "    fi: ({ amount }) => <>invalid</>,",
      "  },",
    ]);
    expect(tsxInterface).toEqual(["  key: I18nTemplate;"]);
  });

  it("should return string by default", () => {
    const data: Translation = {
      key: {
        en: "normal string",
        fi: "",
      },
    };

    const [tsx, tsxInterface] = writeTranslation(data);
    expect(tsx).toEqual([
      "  key: {",
      `    en: "normal string",`,
      `    fi: "",`,
      "  },",
    ]);
    expect(tsxInterface).toEqual(["  key: string;"]);
  });
});
