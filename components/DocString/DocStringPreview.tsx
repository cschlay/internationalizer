import { Documentation } from "../../types";
import { PreviewButton } from "./PreviewButton/PreviewButton";
import { SyntheticEvent } from "react";
import css from "./DocStringPreview.module.css";

interface Props {
  documentation: Documentation;
  setPreviewPath: (url: string) => void;
}

export const DocStringPreview = ({ documentation, setPreviewPath }: Props) => {
  const { description, stories, previews } = documentation;

  const handlePreviewUrlChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { url } = event.currentTarget.dataset;
    if (url) {
      setPreviewPath(url);
    } else {
      console.error("The preview url is not set!");
    }
  };

  return (
    <div className={css.DocStringPreview}>
      <h3>Note to translator</h3>
      {description.length > 0 ? (
        <p className={css.Description}>{description.join("\n")}</p>
      ) : (
        <p className={css.Description}>
          <i>The developers have not documented this translation.</i>
        </p>
      )}

      <hr />
      <nav className={css.PreviewLinks}>
        {stories.map((url) => (
          <PreviewButton
            key={url}
            type="component"
            onClick={handlePreviewUrlChange}
            url={url}
          />
        ))}
        {previews.map((url) => (
          <PreviewButton
            key={url}
            type="page"
            onClick={handlePreviewUrlChange}
            url={url}
          />
        ))}
      </nav>
    </div>
  );
};
