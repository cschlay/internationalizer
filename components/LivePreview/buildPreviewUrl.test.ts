import { APP_HOST, STORYBOOK_HOST } from "../../app.config";
import { buildPreviewUrl } from "./buildPreviewUrl";

describe("buildPreviewUrl", () => {
  it("should return empty string if path or locale is empty", () => {
    expect(buildPreviewUrl("/test", "")).toEqual("");
    expect(buildPreviewUrl("", "en")).toEqual("");
    expect(buildPreviewUrl("", "")).toEqual("");
  });

  it("should build storybook urls", () => {
    const path = "iframe.html?id=test--rules&args=";

    expect(buildPreviewUrl(path, "en")).toEqual(
      `${STORYBOOK_HOST}/iframe.html?id=test--rules&args=&locale=en`
    );
    expect(buildPreviewUrl(`/${path}`, "fi")).toEqual(
      `${STORYBOOK_HOST}/iframe.html?id=test--rules&args=&locale=fi`
    );
  });

  it("should build page urls", () => {
    expect(buildPreviewUrl("test", "en")).toEqual(`${APP_HOST}/en/test`);
    expect(buildPreviewUrl("/test", "fi")).toEqual(`${APP_HOST}/fi/test`);
  });
});
