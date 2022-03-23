import { addSpacesBetween } from "./addSpacesBetween";

describe("addSpacesBetween", () => {
  it("should return empty string", () => {
    expect(addSpacesBetween("")).toEqual("");
  });

  it("should keep inseparable", () => {
    expect(addSpacesBetween("Small")).toEqual("Small");
  });

  it("should add space between two words", () => {
    expect(addSpacesBetween("SmallCar")).toEqual("Small Car");
  });

  it("should not add extra spaces", () => {
    expect(addSpacesBetween("Small Car")).toEqual("Small Car");
  });
});
