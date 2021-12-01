import css from "./TranslationField.module.css";
import styles from "./EditView.module.css";
import { ChangeEvent } from "react";

interface Props {
  recordKey: string;
  locale: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

export const TranslationField = ({
  recordKey,
  locale,
  onChange,
  value,
}: Props) => {
  return (
    <div className={css.TranslationField}>
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
