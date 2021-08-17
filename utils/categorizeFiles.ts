export const categorizeFiles = (files: string[]) => {
  const components: FileMeta[] = [];
  const pages: FileMeta[] = [];
  const misc: FileMeta[] = [];

  for (const path of files) {
    const parts: string[] = path.split("/");
    if (parts.includes("pages")) {
      const url = path.split("pages")[1].replace(".i18n.tsx", "");
      pages.push({ name: url, path });
    } else if (parts.includes("components")) {
      components.push({ name: parts.slice(2, -1).join("/"), path });
    } else {
      misc.push({ name: parts[parts.length - 1], path });
    }
  }

  return {
    components,
    pages,
    miscellaneous: misc,
  };
};

export interface FileMeta {
  name: string;
  path: string;
}

export interface CategorizedFiles {
  components: FileMeta[];
  pages: FileMeta[];
  miscellaneous: FileMeta[];
}
