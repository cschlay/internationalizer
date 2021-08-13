export const EditTable = ({ translations, onChange }) => {
    const handleChange = (event) => {
        onChange(event.currentTarget.dataset.lang, event.currentTarget.dataset.key, event.target.value)
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>EN</th>
                    <th>FI</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(translations).map(([key, val]) => (
                    <tr key={key}>
                        <td>{key}</td>
                        <td>
                            <textarea rows={5} value={val.en} data-key={key} data-lang="en" onChange={handleChange} />
                        </td>
                        <td>
                            <textarea rows={5} value={val.fi} data-key={key} data-lang="fi" onChange={handleChange} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}