import { LANGUAGES } from "../config";
import { SyntheticEvent } from "react";

import styles from "./LanguageToggle.module.css";

export const LanguageToggle = ({ activeLanguages, setActiveLanguages }) => {
  const handleActiveLanguageChange = (
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    const language: string = event.currentTarget.dataset.lang;
    if (activeLanguages.includes(language)) {
      const updatedLanguages = activeLanguages
        .filter((lang) => lang !== language)
        .sort();
      setActiveLanguages(updatedLanguages);
    } else {
      setActiveLanguages([...activeLanguages, language].sort());
    }
  };

  return (
    <div className={styles.Container}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          data-lang={lang}
          data-active={activeLanguages.includes(lang)}
          onClick={handleActiveLanguageChange}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};
