import { Documentation } from "../../types";
import { writeDocstring } from "./writeDocstring";

describe("Docstring conversion", () => {
  it("should add element to correct places", () => {
    const data: Documentation = {
      description: ["Line 1", "Line 2", ""],
      previews: ["/preview-url"],
      stories: ["/story-url"],
    };

    const result = writeDocstring(data);
    expect(result).toEqual([
      "/**",
      " * Line 1",
      " * Line 2",
      " * ",
      " * @storybook /story-url",
      " * @preview /preview-url",
      " */",
    ]);
  });
});
