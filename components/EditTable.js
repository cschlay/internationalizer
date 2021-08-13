export const EditTable = ({ translations }) => {
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
                    <tr key={key}><td>{key}</td><td><textarea rows={5}>{val.en}</textarea></td><td><textarea rows={5}>{val.fi}</textarea></td></tr>
                ))}
            </tbody>
        </table>
    )
}