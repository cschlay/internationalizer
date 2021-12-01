import { SyntheticEvent } from "react";
import { Translation } from "../types";

import styles from "./EditView.module.css";
import { TranslationField } from "./TranslationField";

interface Props {
  locales: string[];
  translations: Translation;
  onChange: (language: string, key: string, value: string) => void;
}

export const EditView = ({ locales, translations, onChange }: Props) => {
  const handleChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    onChange(
      event.currentTarget.dataset.locale,
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
          <div className={styles.Key}>{key.replace(/([A-Z])/g, " $1")}</div>
          {locales.map((lang) => (
            <div key={`${key}-${lang}`} className={styles.LanguageRow}>
              <small className={styles.LanguageTag}>{lang}</small>

              <TranslationField
                recordKey={key}
                locale={lang}
                onChange={handleChange}
                value={texts[lang]}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
