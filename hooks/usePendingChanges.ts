import { useCallback, useState } from "react";

interface ReturnValue {
  hasPendingChanges: boolean;
  setHasPendingChanges: (value: boolean) => void;
}

export const usePendingChanges = (): ReturnValue => {
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const pendingChangesListener = useCallback((event: BeforeUnloadEvent) => {
    event.returnValue = "message";
    return "message";
  }, []);

  const setHasPendingChanges = useCallback(
    (value: boolean) => {
      if (!hasChanges && value) {
        window.addEventListener("beforeunload", pendingChangesListener);
        setHasChanges(true);
      }
      if (!value) {
        window.removeEventListener("beforeunload", pendingChangesListener);
        setHasChanges(false);
      }
    },
    [hasChanges, pendingChangesListener]
  );

  return {
    hasPendingChanges: hasChanges,
    setHasPendingChanges,
  };
};
