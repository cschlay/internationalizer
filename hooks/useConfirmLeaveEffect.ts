import { useEffect } from "react";

const handlePendingChanges = (event) => {
  event.returnValue = "";
};

/**
 * Checks the value and shows browser built-in warning when trying to leave page.
 */
export const useConfirmLeaveEffect = (hasPendingChanges: boolean) => {
  useEffect(() => {
    if (hasPendingChanges) {
      window.addEventListener("beforeunload", handlePendingChanges);
    }
    return () =>
      window.removeEventListener("beforeunload", handlePendingChanges);
  }, [hasPendingChanges]);
};
