import { formatPreviewUrl } from "../utils/formatPreviewUrl";
import { Documentation } from "../types";
import { SyntheticEvent } from "react";

import css from "./DocstringPreview.module.css";

interface Props {
  documentation: Documentation;
  previewLanguage: string;
  setPreviewUrl: (url: string) => void;
}

export const DocstringPreview = ({ documentation, setPreviewUrl }: Props) => {
  const { description, stories, previews } = documentation;

  const handlePreviewUrlChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { url } = event.currentTarget.dataset;
    setPreviewUrl(formatPreviewUrl(url));
  };

  return (
    <div className={css.Container}>
      <h3>Note to translator</h3>
      {description.length > 0 ? (
        <p className={css.Description}>{description.join("\n")}</p>
      ) : (
        <p className={css.Description}>
          <i>The developers have not documented this translation.</i>
        </p>
      )}

      <nav className={css.PreviewLinks}>
        {stories.map((url) => (
          <button key={url} onClick={handlePreviewUrlChange} data-url={url}>
            Component Preview
          </button>
        ))}
        {previews.map((url) => (
          <button key={url} onClick={handlePreviewUrlChange} data-url={url}>
            Page Preview
          </button>
        ))}
      </nav>
    </div>
  );
};
