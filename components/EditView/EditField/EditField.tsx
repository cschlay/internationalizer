import { ChangeEvent } from "react";
import css from "./EditField.module.css";

interface Props {
  recordKey: string;
  locale: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

/**
 * The text field for editing translation strings.
 */
export const EditField = ({ recordKey, locale, onChange, value }: Props) => {
  return (
    <div className={css.EditField}>
      <textarea
        className={css.TextArea}
        data-key={recordKey}
        data-locale={locale}
        data-error={Boolean(!value)}
        onChange={onChange}
        spellCheck={false}
        value={value}
        rows={1}
      />
      {!value && (
        <small className={css.ErrorMessage}>Translation is missing!</small>
      )}
    </div>
  );
};
