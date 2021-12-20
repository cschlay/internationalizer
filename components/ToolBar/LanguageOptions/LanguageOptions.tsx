import { LanguageToggle } from "./LanguageToggle/LanguageToggle";
import { LanguageSelect } from "./LanguageSelect/LanguageSelect";
import css from "./LanguageOptions.module.css";

interface Props {
  activeLanguages: string[];
  locales: string[];
  setActiveLanguages: (languages: string[]) => void;
  setPreviewLanguage: (language: string) => void;
}

export const LanguageOptions = ({
  activeLanguages,
  locales,
  setActiveLanguages,
  setPreviewLanguage,
}: Props) => {
  return (
    <div className={css.LanguageOptions}>
      <LanguageToggle
        locales={locales}
        activeLanguages={activeLanguages}
        setActiveLanguages={setActiveLanguages}
      />
      <small>Preview</small>
      <LanguageSelect
        locales={locales}
        setPreviewLanguage={setPreviewLanguage}
      />
    </div>
  );
};
