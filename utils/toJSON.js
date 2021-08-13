export const toJSON = (translation) => {
    translation = translation
            .replace(/export const .*: Translation = /sg, "")
            .replace(/\(.*\) => /g, "")
            .replace(/<>/g, "\"")
            .replace(/<\/>/g, "\"")
    let jsonEvaluated = {}
    eval("jsonEvaluated = " + translation)
    return jsonEvaluated
}
