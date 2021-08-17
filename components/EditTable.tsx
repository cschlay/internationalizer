import { SyntheticEvent } from "react";
import { Translation } from "../types";

import styles from "./EditTable.module.css";

interface Props {
  languages: string[];
  translations: Translation;
  onChange: (language: string, key: string, value: string) => void;
}

export const EditTable = ({ languages, translations, onChange }: Props) => {
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
            <b>{key}</b>
          </div>
          {languages.map((lang) => (
            <div key={`${key}-${lang}`} className={styles.LanguageRow}>
              <small className={styles.LanguageTag}>{lang}</small>
              <textarea
                className={styles.TextField}
                value={texts[lang] as string}
                data-key={key}
                data-lang={lang}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
