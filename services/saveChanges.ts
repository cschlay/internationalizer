import { TranslationFileContent } from "../types";
import { toTSX } from "../utils/tsx/toTSX";

const saveChanges = async (file: TranslationFileContent): Promise<void> => {
  const response = await fetch("/api/write-changes", {
    method: "POST",
    body: JSON.stringify({ path: file.path, content: toTSX(file) }),
  });

  if (response.ok) {
    return;
  }

  return Promise.reject(
    "Failed to save. File locked or not permitted to change?"
  );
};

export default saveChanges;
