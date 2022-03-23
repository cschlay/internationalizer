import { getClassName } from "./getClassName";

describe("getClassName", () => {
  it("should return single class", () => {
    expect(getClassName("one")).toEqual("one");
  });

  it("should return condition classes", () => {
    // noinspection PointlessBooleanExpressionJS
    const className = getClassName("one", false && "two", true && "three");
    expect(className).toEqual("one three");
  });
});
