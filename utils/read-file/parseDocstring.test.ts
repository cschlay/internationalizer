import { parseDocstring } from "./parseDocstring";

describe("Documentation comment parse", () => {
  it("should extract storybook urls", () => {
    const data = `
    /** 
     *   @storybook url1
     *   @storybook url2
     */`;

    const { stories } = parseDocstring(data);
    expect(stories).toEqual(["url1", "url2"]);
  });

  it("should extract preview urls", () => {
    const data = `
    /**
     *  @preview url1
     *  @preview url2
     */`;

    const { previews } = parseDocstring(data);
    expect(previews).toEqual(["url1", "url2"]);
  });

  it("should put non previews as description", () => {
    const data = `
    /**
     *  Line 1
     *  Line 2
     */`;

    const { description } = parseDocstring(data);
    expect(description).toEqual(["", "Line 1", "Line 2"]);
  });

  it("should separate all eelements", () => {
    const data = `
    /** 
     *  Line 1
     *  Line 2
     *
     *  @storybook story 1
     *  @storybook story 2
     *  @preview preview 1
     *  @preview preview 2
     */`;

    const { description, stories, previews } = parseDocstring(data);

    expect(description).toEqual(["", "Line 1", "Line 2", ""]);
    expect(stories).toEqual(["story 1", "story 2"]);
    expect(previews).toEqual(["preview 1", "preview 2"]);
  });
});
