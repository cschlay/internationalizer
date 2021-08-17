import { Button } from "./Button";
import { LanguageSelect } from "./LanguageSelect";
import { LanguageToggle } from "./LanguageToggle";

import styles from "./ToolBar.module.css";

interface Props {
  activeLanguages: string[];
  setActiveLanguages: (languages: string[]) => void;
  setPreviewLanguage: (language: string) => void;
  hasPendingChanges: boolean;
  onSave: () => void;
}

export const ToolBar = ({
  activeLanguages,
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
        <LanguageToggle
          activeLanguages={activeLanguages}
          setActiveLanguages={setActiveLanguages}
        />
        <div className={styles.PreviewLanguageContainer}>
          <small>Preview</small>
          <LanguageSelect setPreviewLanguage={setPreviewLanguage} />
        </div>
      </div>
    </div>
  );
};
