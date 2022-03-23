import { EditField } from "./EditField/EditField";
import { SyntheticEvent } from "react";
import { Translation } from "../../types";
import { addSpacesBetween } from "../../utils/addSpacesBetween";
import css from "./EditView.module.css";

interface Props {
  locales: string[];
  translations: Translation;
  onChange: (language: string, key: string, value: string) => void;
}

export const EditView = ({ locales, translations, onChange }: Props) => {
  const handleChange = (event: SyntheticEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    const { locale, key } = event.currentTarget.dataset;
    if (locale && key) {
      onChange(locale, key, value);
    } else {
      console.error(
        `Translation is malformed: locale=${locale}, key=${key}, value=${value}!`
      );
    }
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
      {Object.entries(translations).map(([fieldName, texts]) => (
        <div key={fieldName} className={css.Background}>
          <h3 className={css.FieldName}>{addSpacesBetween(fieldName)}</h3>
          {locales.map((locale) => (
            <div key={`${fieldName}-${locale}`} className={css.FieldValue}>
              <small className={css.Locale}>{locale}</small>
              <EditField
                recordKey={fieldName}
                locale={locale}
                onChange={handleChange}
                value={texts[locale]}
              />
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
