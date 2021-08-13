import Head from 'next/head'
import {useEffect, useState} from "react";
import {EditTable} from "../components/EditTable";
import {toTSX} from "../utils/toTSX";


const HomePage = () => {
    const [files, setFiles] = useState([])
    const [activeFile, setActiveFile] = useState()

    const fetchFile = (file) => {
        fetch(`/api/get-file-content?file=${encodeURIComponent(file)}`).then(res => res.json()).then(setActiveFile)
    }

    const handleSave = () => {
        const tsxString = toTSX(activeFile)
        console.log(tsxString)
        fetch("/api/write-changes", {
            method: "POST",
            body: JSON.stringify({path: activeFile.path, content: tsxString})
        })
    }
    useEffect(() => {
        fetch("/api/list-translation-files").then(res => res.json()).then(setFiles)
    }, [])

  return (
    <div>
      <Head>
        <title>Internationalizer</title>
      </Head>
        <div>
            <ul>{files.map(file => <li onClick={() => fetchFile(file)} key={file}>{file}</li>)}</ul>
        </div>

        <button onClick={handleSave}>Save</button>
        {activeFile && <EditTable translations={activeFile.translations} />}
    </div>
  )
}

export default HomePage
