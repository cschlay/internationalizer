import { formatPreviewUrl } from "../utils/formatPreviewUrl";
import { Documentation } from "../types";
import { SyntheticEvent } from "react";

import styles from "./DocstringPreview.module.css";

interface Props {
  docstring: Documentation;
  previewLanguage: string;
  setPreviewUrl: (url: string) => void;
}

export const DocstringPreview = ({ docstring, setPreviewUrl }: Props) => {
  if (!docstring) {
    return null;
  }

  const handlePreviewUrlChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { url } = event.currentTarget.dataset;
    setPreviewUrl(formatPreviewUrl(url));
  };

  return (
    <div className={styles.Container}>
      <h3>Note to translator</h3>
      <p className={styles.Description}>{docstring.description.join("\n")}</p>

      <nav className={styles.PreviewLinks}>
        {docstring.stories.map((url) => (
          <button key={url} onClick={handlePreviewUrlChange} data-url={url}>
            Component Preview
          </button>
        ))}
        {docstring.previews.map((url) => (
          <button key={url} onClick={handlePreviewUrlChange} data-url={url}>
            Page Preview
          </button>
        ))}
      </nav>
    </div>
  );
};
