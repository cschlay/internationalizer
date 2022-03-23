import { SyntheticEvent } from "react";
import css from "./PreviewLanguageSelect.module.css";

interface Props {
  locales: string[];
  setPreviewLanguage: (language: string) => void;
}

export const PreviewLanguageSelect = ({
  locales,
  setPreviewLanguage,
}: Props) => {
  const handleChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    setPreviewLanguage(event.currentTarget.value);
  };

  return (
    <select
      className={`${css.PreviewLanguageSelect} focus kb-focus`}
      onChange={handleChange}
    >
      {locales.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};
