import { LanguageOptions } from "./LanguageOptions/LanguageOptions";
import { SaveButton } from "./SaveButton/SaveButton";
import css from "./ToolBar.module.css";

interface Props {
  activeLanguages: string[];
  hasPendingChanges: boolean;
  locales: string[];
  onSave: () => void;
  setActiveLanguages: (languages: string[]) => void;
  setPreviewLanguage: (language: string) => void;
}

export const ToolBar = ({
  activeLanguages,
  hasPendingChanges,
  locales,
  onSave,
  setActiveLanguages,
  setPreviewLanguage,
}: Props) => {
  return (
    <div className={css.Container}>
      <SaveButton hasPendingChanges={hasPendingChanges} onSave={onSave} />
      <LanguageOptions
        activeLanguages={activeLanguages}
        locales={locales}
        setActiveLanguages={setActiveLanguages}
        setPreviewLanguage={setPreviewLanguage}
      />
    </div>
  );
};
