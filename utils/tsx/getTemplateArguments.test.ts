import { getTemplateArguments } from "./getTemplateArguments";

describe("Template argument extraction", () => {
  it("should get one argument", () => {
    const result = getTemplateArguments("Hello {name}!");
    expect(result).toEqual(["name"]);
  });

  it("should return multiple arguments", () => {
    const result = getTemplateArguments("The car costs {amount} {unit}.");
    expect(result).toEqual(["amount", "unit"]);
  });

  it("should only include valid JavaScript arguments", () => {
    const result = getTemplateArguments(
      "The {invalid arg} {i\nvalid} {valid100}"
    );
    expect(result).toEqual(["valid100"]);
  });
});
