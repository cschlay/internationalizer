import { LanguageSelect } from "../LanguageSelect";
import { LanguageToggle } from "../LanguageToggle";
import { SaveButton } from "./SaveButton/SaveButton";
import css from "./ToolBar.module.css";

interface Props {
  locales: string[];
  activeLanguages: string[];
  setActiveLanguages: (languages: string[]) => void;
  setPreviewLanguage: (language: string) => void;
  hasPendingChanges: boolean;
  onSave: () => void;
}

export const ToolBar = ({
  activeLanguages,
  locales,
  setActiveLanguages,
  setPreviewLanguage,
  hasPendingChanges,
  onSave,
}: Props) => {
  return (
    <div className={css.Container}>
      <SaveButton hasPendingChanges={hasPendingChanges} onSave={onSave} />

      <div className={css.LanguageOptions}>
        <div className={css.PreviewLanguageContainer}>
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
      </div>
    </div>
  );
};
