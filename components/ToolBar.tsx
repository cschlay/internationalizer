import { Button } from "./Button";
import { LanguageSelect } from "./LanguageSelect";
import { LanguageToggle } from "./LanguageToggle";

import styles from "./ToolBar.module.css";

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
    <div className={styles.Container}>
      <div>
        <Button onClick={onSave} disabled={!hasPendingChanges}>
          {hasPendingChanges ? "Save (CTRL + S)" : "Translation saved"}
        </Button>{" "}
        {hasPendingChanges && (
          <small className={styles.UnsavedChanges}>
            You have unsaved changes.
          </small>
        )}
      </div>
      <div className={styles.LanguageOptions}>
        <div className={styles.PreviewLanguageContainer}>
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
