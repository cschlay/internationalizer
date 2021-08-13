import styles from "./ToolBar.module.css";
import { Button } from "./Button";

interface Props {
  hasPendingChanges: boolean;
  onSave: () => void;
}

export const ToolBar = ({ hasPendingChanges, onSave }: Props) => {
  return (
    <div className={styles.Container}>
      <Button onClick={onSave} disabled={!hasPendingChanges}>
        {hasPendingChanges ? "Save (CTRL + S)" : "Translation saved"}
      </Button>{" "}
      {hasPendingChanges && (
        <small className={styles.UnsavedChanges}>
          You have unsaved changes.
        </small>
      )}
    </div>
  );
};
