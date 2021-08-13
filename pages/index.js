import Head from 'next/head'
import {useEffect, useState} from "react";
import {EditTable} from "../components/EditTable";
import {toTSX} from "../utils/toTSX";


const HomePage = () => {
    const [files, setFiles] = useState([])
    const [activeFile, setActiveFile] = useState()
    const [saved, setSaved] = useState(true)

    const fetchFile = (file) => {
        fetch(`/api/get-file-content?file=${encodeURIComponent(file)}`).then(res => res.json()).then(setActiveFile)
    }

    const handleChange = (locale, key, value) => {
        setSaved(false)
        const updated = {...activeFile}
        updated.translations[key][locale] = value
        setActiveFile(updated)
    }

    const handleSave = () => {
        const tsxString = toTSX(activeFile)
        console.log(tsxString)
        fetch("/api/write-changes", {
            method: "POST",
            body: JSON.stringify({path: activeFile.path, content: tsxString})
        }).then(() => setSaved(true))
    }
    useEffect(() => {
        fetch("/api/list-translation-files").then(res => res.json()).then(setFiles)
    }, [])

  return (
    <div>
      <Head>
        <title>Internationalizer</title>
      </Head>
        <main>
        <div className="filenav">
            <ul>{files.map(file => {
                const filesplit= file.split("/")
                const name = filesplit[filesplit.length-1]
                return (<li className={activeFile && activeFile.name === name && "active-file"} onClick={() => fetchFile(file)} key={file}>{name}</li>)
            })}</ul>
        </div>

            <div className="preview">
                <div className="toolbar">
                    <div>
                        <button onClick={handleSave}>Save</button>{' '}
                        <span>{!saved && "You have unsaved changes."}</span>
                    </div>

                    <div>
                        <button>Previous</button>
                        <button>Save and open next</button>
                    </div>
                </div>

                {activeFile ? <EditTable translations={activeFile.translations} onChange={handleChange} /> : <p style={{textAlign: "center"}}>Start tranlating by selecting file in the left</p>}

            </div>
        </main>
    </div>
  )
}

export default HomePage
