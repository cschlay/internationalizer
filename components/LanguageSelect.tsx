import { LANGUAGES } from "../config";
import { SyntheticEvent } from "react";

import styles from "./LanguageSelect.module.css";

interface Props {
  setPreviewLanguage: (language: string) => void;
}

export const LanguageSelect = ({ setPreviewLanguage }: Props) => {
  const handleChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    setPreviewLanguage(event.currentTarget.value);
  };

  return (
    <select className={styles.Container} onChange={handleChange}>
      {LANGUAGES.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};
