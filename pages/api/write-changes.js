import fs from "fs"

const writeChanges = (req, res) => {
    return new Promise(resolve => {
        const {path, content} = JSON.parse(req.body)
        fs.writeFileSync(path, content)
        res.status(200).json({})
        resolve()
    })
}

export default writeChanges
