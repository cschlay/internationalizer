import { LANGUAGES } from "../config";
import styles from "./LanguageToggle.module.css";
import { SyntheticEvent } from "react";

export const LanguageToggle = ({ activeLanguages, setActiveLanguages }) => {
  const handleActiveLanguageChange = (
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    const language: string = event.currentTarget.dataset.lang;
    if (activeLanguages.includes(language)) {
      setActiveLanguages(
        activeLanguages.filter((lang) => lang !== language).sort()
      );
    } else {
      setActiveLanguages([...activeLanguages, language].sort());
    }
  };

  return (
    <div className={styles.Container}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={handleActiveLanguageChange}
          data-lang={lang}
          data-active={activeLanguages.includes(lang)}
        >
          {lang}
        </button>
      ))}
    </div>
  );
};
