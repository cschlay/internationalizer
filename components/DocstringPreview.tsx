import { ParsedDocstring } from "../types";
import { FRONTEND_HOST, STORYBOOK_HOST } from "../config";
import { SyntheticEvent } from "react";
import styles from "./DocstringPreview.module.css";

interface Props {
  docstring: ParsedDocstring;
  targetLanguage: string;
  setPreviewUrl: (url: string) => void;
}
export const DocstringPreview = ({ docstring, setPreviewUrl }: Props) => {
  if (!docstring) {
    return null;
  }

  const handlePreviewUrlChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    setPreviewUrl(event.currentTarget.dataset.url);
  };

  return (
    <div className={styles.Container}>
      <h3>Notes to translator</h3>
      <p style={{ whiteSpace: "pre-wrap", fontSize: "0.8rem" }}>
        {docstring.description.join("\n")}
      </p>

      <nav className={styles.PreviewLinks}>
        {docstring.storybookUrls.map((url, i) => (
          <button
            key={url}
            onClick={handlePreviewUrlChange}
            data-url={`${STORYBOOK_HOST}/${url}`}
          >
            Storybook
          </button>
        ))}
        {docstring.previewUrls.map((url) => (
          <button
            key={url}
            onClick={handlePreviewUrlChange}
            data-url={`${FRONTEND_HOST}${url}`}
          >
            Page Preview
          </button>
        ))}
      </nav>
      <hr />
    </div>
  );
};
