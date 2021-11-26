import { SyntheticEvent } from "react";
import { Translation } from "../types";

import styles from "./EditView.module.css";

interface Props {
  languages: string[];
  translations: Translation;
  onChange: (language: string, key: string, value: string) => void;
}

export const EditView = ({ languages, translations, onChange }: Props) => {
  const handleChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    onChange(
      event.currentTarget.dataset.lang,
      event.currentTarget.dataset.key,
      event.currentTarget.value
    );
  };

  if (Object.keys(translations).length === 0) {
    return (
      <p>
        Can&#39;t edit the file, translation is malformed. The developers have
        probably written the source file incorrectly.
      </p>
    );
  }

  return (
    <>
      {Object.entries(translations).map(([key, texts]) => (
        <div key={key} className={styles.Card}>
          <div className={styles.Key}>
            {key.charAt(0).toUpperCase() +
              key.replace(/([A-Z])/g, " $1").slice(1)}
          </div>
          {languages.map((lang) => (
            <div key={`${key}-${lang}`} className={styles.LanguageRow}>
              <small className={styles.LanguageTag}>{lang}</small>
              <textarea
                className={styles.TextField}
                data-key={key}
                data-lang={lang}
                onChange={handleChange}
                spellCheck={false}
                value={texts[lang] as string}
                rows={1}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
