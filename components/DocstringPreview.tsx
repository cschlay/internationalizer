import { ParsedDocstring } from "../types";
import { APP_HOST, STORYBOOK_HOST } from "../config";
import { SyntheticEvent } from "react";
import styles from "./DocstringPreview.module.css";
import { formatPreviewUrl } from "../utils/formatPreviewUrl";

interface Props {
  docstring: ParsedDocstring;
  previewLanguage: string;
  setPreviewUrl: (url: string) => void;
}

export const DocstringPreview = ({
  docstring,
  previewLanguage,
  setPreviewUrl,
}: Props) => {
  if (!docstring) {
    return null;
  }

  const handlePreviewUrlChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    let url = event.currentTarget.dataset.url;
    setPreviewUrl(formatPreviewUrl(url, previewLanguage));
  };

  return (
    <div className={styles.Container}>
      <h3>Notes to translator</h3>
      <p style={{ whiteSpace: "pre-wrap", fontSize: "0.8rem" }}>
        {docstring.description.join("\n")}
      </p>

      <nav className={styles.PreviewLinks}>
        {docstring.storybookUrls.map((url) => (
          <button
            key={url}
            onClick={handlePreviewUrlChange}
            data-url={`${STORYBOOK_HOST}/${url}`}
          >
            Component Preview
          </button>
        ))}
        {docstring.previewUrls.map((url) => (
          <button
            key={url}
            onClick={handlePreviewUrlChange}
            data-url={`${APP_HOST}${url}`}
          >
            Page Preview
          </button>
        ))}
      </nav>
    </div>
  );
};
