import css from "./SaveButton.module.css";
import { Button } from "../../Button";

interface Props {
  hasPendingChanges: boolean;
  onSave: () => void;
}

export const SaveButton = ({ hasPendingChanges, onSave }: Props) => {
  return (
    <div>
      <Button onClick={onSave} disabled={!hasPendingChanges}>
        {hasPendingChanges ? "Save (CTRL + S)" : "Translation saved"}
      </Button>
      {hasPendingChanges && (
        <small className={css.UnsavedChanges}>You have unsaved changes.</small>
      )}
    </div>
  );
};