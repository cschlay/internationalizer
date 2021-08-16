import styles from "./ToolBar.module.css";
import { Button } from "./Button";
import { LanguageSelect } from "./LanguageSelect";
import { LanguageToggle } from "./LanguageToggle";

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
      <div
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <LanguageToggle
          activeLanguages={activeLanguages}
          setActiveLanguages={setActiveLanguages}
        />
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <small>Preview</small>
          <LanguageSelect setPreviewLanguage={setPreviewLanguage} />
        </div>
      </div>
    </div>
  );
};
