import { LanguageToggle } from "./LanguageToggle/LanguageToggle";
import { PreviewLanguageSelect } from "./PreviewLanguageSelect/PreviewLanguageSelect";
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
        activeLocales={activeLanguages}
        setActiveLocales={setActiveLanguages}
      />
      <small>Preview In:</small>
      <PreviewLanguageSelect
        locales={locales}
        setPreviewLanguage={setPreviewLanguage}
      />
    </div>
  );
};
