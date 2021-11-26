import { SyntheticEvent } from "react";

import styles from "./LanguageSelect.module.css";

interface Props {
  locales: string[];
  setPreviewLanguage: (language: string) => void;
}

export const LanguageSelect = ({ locales, setPreviewLanguage }: Props) => {
  const handleChange = (event: SyntheticEvent<HTMLSelectElement>) => {
    setPreviewLanguage(event.currentTarget.value);
  };

  return (
    <select className={styles.Container} onChange={handleChange}>
      {locales.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};
