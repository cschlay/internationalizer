import glob from "glob"

// TODO: Put to environment variables.
const PROJECT_ROOT = "C:/Home/Hobby/Projects/LibrarySystem/client-web"
const TRANSLATION_PATTERN = `${PROJECT_ROOT}/+(components|core|translations)/**/*.i18n.+(ts|tsx)`

const listTranslationFiles = (req, res) => {
  return new Promise(resolve => {
    glob(TRANSLATION_PATTERN, {}, (_, files) => {
      res.status(200).json(files.map(f => f.replace(PROJECT_ROOT, "")))
      resolve()
    })
  })
}

export default listTranslationFiles
