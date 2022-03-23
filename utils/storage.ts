import { LOCALSTORAGE_KEY_LANGUAGES } from "../app.config";

const getActiveLanguages = (): string[] => {
  const languages = localStorage.getItem(LOCALSTORAGE_KEY_LANGUAGES);

  try {
    if (languages) {
      return JSON.parse(languages);
    }
  } catch {
    // The user has not set languages.
  }

  return ["en"];
};

const setActiveLanguages = (languages: string[]) => {
  localStorage.setItem(LOCALSTORAGE_KEY_LANGUAGES, JSON.stringify(languages));
};

export const storage = {
  getLanguages: getActiveLanguages,
  setLanguages: setActiveLanguages,
};
