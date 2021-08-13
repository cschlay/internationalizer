export const toTSX = (file) => {
    let result = "/* eslint-disable react/display-name */\n"
    result += file.imports.join("\n")
    const [objectName] =  file.name.split(".")
    result += `\n\nexport const ${objectName}I18n: Translation = `

    const body = convertBody(file.translations)
    result += body;
    result += "\n\n"
    result += getInterface(file.translations)
    return result;
}

const convertBody = (translation) => {
    let result = "{\n"
    Object.entries(translation).forEach(([key, value]) => {
        const record = Object.values(value)[0]
        result += `    ${key}: `

        const args = getTemplateArgs(record)
        result += "{"
        if (args) {
            const argRecord = `({ ${args.join(", ")} }) =>`
            Object.entries(value).forEach(([lang, content]) => {
                result += `\n        ${lang}: ${argRecord} <>${content}</>,`
            })
        } else {
            Object.entries(value).forEach(([lang, content]) => {
                result += `\n        ${lang}: "${content}",`
            })
        }
        result += "\n    },"
        result += "\n"
    })
    result += "};"

    return result
}

const getTemplateArgs = (record) => {
    const templateArgs = record.match(/{.*}/g);
    if (templateArgs) {
        return templateArgs.map(x => x.replace(/{/g, "").replace(/}/g, ""))
    }

    return null
}

const getInterface = (translation) => {
    let result = "export interface I18nContent {\n"

    Object.entries(translation).forEach(([key, value]) => {
        const record = Object.values(value)[0]
        result += `    ${key}: `

        const args = getTemplateArgs(record)
        if (args) {
            result += `I18nTemplate;`
        } else {
            result += `I18nTextNode;`
        }
        result += "\n"
    })
    result += "}"
    return result
}