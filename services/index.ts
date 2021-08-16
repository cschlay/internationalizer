import getFileContent from "./getFileContent";
import saveChanges from "./saveChanges";

/**
 * A collection of functions that works as API request proxy that calls the /api/... endpoints.
 */
export const services = { getFileContent, saveChanges };
