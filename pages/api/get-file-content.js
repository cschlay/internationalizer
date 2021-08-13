import fs from "fs"
import {toJSON} from "../../utils/toJSON";

const PROJECT_ROOT = "C:/Home/Hobby/Projects/LibrarySystem/client-web"

const getFileContent = (req, res) => {
    return new Promise(resolve => {
        const path = `${PROJECT_ROOT}${req.query.file}`
        fs.readFile(path, "utf-8", (_, data) => {
            const translations = data.match(/export const .*: Translation [^;]*;/sg)

            const splitPath = req.query.file.split("/")
            res.status(200).json({
                "path": path,
                "name": splitPath[splitPath.length - 1],
                "imports": data.match(/import [^;]*;/gs),
                "translations": translations ? toJSON(translations[0]) : {},
            })

            resolve()
        })
    })
}

export default getFileContent
