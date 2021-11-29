export class Cleanable {
  private data;
  constructor(data: string) {
    this.data = data;
  }

  removeComments() {
    // One-line comments
    this.data = this.data.replace(/\s*\/\/.*/g, "");
    this.data = this.data.replace(/\s*\/\*\*.*\*\//g, "");
    // Multiline comments
    this.data = this.data.replace(/\s*\/\*\*(\s*\*.*)+/g, "");
    return this;
  }

  removeExport() {
    this.data = this.data.replace(/export const .*: Translation = /, "");
    return this;
  }

  replaceArrows() {
    this.data = this.data.replace(/\({?\n?(\s*[a-zA-Z\d,\s]*)}?\) =>\s*/g, "");
    return this;
  }

  replaceReactFragments() {
    // The opening fragment
    this.data = this.data.replace(/\(?\n?(\s{2,})?<>\n?\s*/g, '"');
    // The closing fragment
    this.data = this.data.replace(/\s*<\/>\s*\)?/g, '"');
    return this;
  }

  toString() {
    return this.data;
  }
}
