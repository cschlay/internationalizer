import { SyntheticEvent } from "react";
import css from "./PreviewButton.module.css";

interface Props {
  type: "component" | "page";
  onClick: (event: SyntheticEvent<HTMLButtonElement>) => void;
  url: string;
}

export const PreviewButton = ({ onClick, type, url }: Props) => {
  return (
    <button
      className={`${css.PreviewButton} kb-focus`}
      data-url={url}
      onClick={onClick}
    >
      {type === "page" ? "Page" : "Component"} Preview
    </button>
  );
};
