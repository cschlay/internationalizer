import { Cleanable } from "./cleanTranslation";

describe("Translation cleaning", () => {
  it("should remove export statement", () => {
    const data = `export const InputI18n: Translation = {}`;
    const result = new Cleanable(data).removeExport().toString();
    expect(result).toEqual("{}");
  });

  it("should remove comments", () => {
    const data = `{
      key: {
        // str1
        // str2
        en: "",
        /** hello */
        fi: "",
        /** 
         * docstring
         * 
         */
        se: ""
      }
    }`;

    const result = new Cleanable(data).removeComments().toString();
    expect(result).toEqual(`{
      key: {
        en: "",
        fi: "",
        se: ""
      }
    }`);
  });

  it("should replace all react fragments", () => {
    const data = `{
      key: {
        f1: <>f1</>,
        f2: () => (<>f2</>),
        f3: () => (
          <>f3</>
        ),
        f4: () => (
          <>
            f4
          </>
        )
      }
    }`;

    const result = new Cleanable(data).replaceReactFragments().toString();
    expect(result).toEqual(`{
      key: {
        f1: "f1",
        f2: () => "f2",
        f3: () => "f3",
        f4: () => "f4"
      }
    }`);
  });

  it("should remove arrow functions", () => {
    const data = `{
      key: {
        fn1: () => <>fn1</>,
        fn2: () => \`fn2\`,
        fn3: ({ }) => <>fn3</>,
        fn4: ({ arg1 }) => \`fn4\`,
        fn5: ({ arg1, arg2 }) => \`fn5\`,
        fn6: ({
          arg1,
          arg2,
          arg3,
          arg4,
        }) => "fn6"
      }
    }`;
    const result = new Cleanable(data).replaceArrows().toString();
    expect(result).toEqual(`{
      key: {
        fn1: <>fn1</>,
        fn2: \`fn2\`,
        fn3: <>fn3</>,
        fn4: \`fn4\`,
        fn5: \`fn5\`,
        fn6: "fn6"
      }
    }`);
  });
});
