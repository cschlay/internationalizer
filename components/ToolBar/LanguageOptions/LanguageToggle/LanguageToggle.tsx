import { SyntheticEvent, useEffect } from "react";
import css from "./LanguageToggle.module.css";
import { storage } from "../../../../utils/storage";

interface Props {
  locales: string[];
  activeLocales: string[];
  setActiveLocales: (languages: string[]) => void;
}

export const LanguageToggle = ({
  locales,
  activeLocales,
  setActiveLocales,
}: Props) => {
  const handleActiveLanguageChange = (
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    const locale = event.currentTarget.dataset.lang;

    if (!locale) {
      return console.error("You have not set 'data-lang' attribute!");
    }

    if (activeLocales.includes(locale)) {
      const languages = activeLocales.filter((lang) => lang !== locale).sort();
      setActiveLocales(languages);
      storage.setLanguages(languages);
    } else {
      const languages = [...activeLocales, locale].sort();
      setActiveLocales(languages);
      storage.setLanguages(languages);
    }
  };

  useEffect(() => {
    setActiveLocales(storage.getLanguages());
  }, [setActiveLocales]);

  return (
    <div className={css.Container}>
      {locales.map((locale: string) => (
        <button
          key={locale}
          className="kb-focus"
          data-lang={locale}
          data-active={activeLocales.includes(locale)}
          onClick={handleActiveLanguageChange}
        >
          {locale}
        </button>
      ))}
    </div>
  );
};
