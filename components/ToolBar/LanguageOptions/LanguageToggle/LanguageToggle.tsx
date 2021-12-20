import { LOCALSTORAGE_KEY_LANGUAGES } from "../../../../app.config";
import { SyntheticEvent } from "react";

import styles from "./LanguageToggle.module.css";

export const LanguageToggle = ({
  locales,
  activeLanguages,
  setActiveLanguages,
}) => {
  const handleActiveLanguageChange = (
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    const language: string = event.currentTarget.dataset.lang;
    if (activeLanguages.includes(language)) {
      const updatedLanguages = activeLanguages
        .filter((lang) => lang !== language)
        .sort();
      setActiveLanguages(updatedLanguages);

      localStorage.setItem(
        LOCALSTORAGE_KEY_LANGUAGES,
        JSON.stringify(updatedLanguages)
      );
    } else {
      const updatedLanguages = [...activeLanguages, language].sort();
      setActiveLanguages(updatedLanguages);

      localStorage.setItem(
        LOCALSTORAGE_KEY_LANGUAGES,
        JSON.stringify(updatedLanguages)
      );
    }
  };

  return (
    <div className={styles.Container}>
      {locales.map((lang) => (
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
