import { useEffect } from "react";

/**
 * Adds the custom functionality to CTRL + S.
 * The default behavior would save the page as HTML.
 */
export const useCtrlSaveEffect = (saveHandler: () => void) => {
  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveHandler();
      }
    };

    window.addEventListener("keydown", eventHandler);
    return () => window.removeEventListener("keydown", eventHandler);
  }, [saveHandler]);
};
