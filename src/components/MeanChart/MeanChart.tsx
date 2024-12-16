import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import combinedKeysIntoArray from "./utils/combinedKeysIntoArray";
import analyzeNonSequentialData from "./utils/analyzeNonSequentialData";

const MeanChart = () => {
    const files = useSelector((state: RootState) => state.csv.files);
    const activeFileId = useSelector(
        (state: RootState) => state.csv.activeFileId
    );

    const activeFile = files.find((file) => file.id === activeFileId);
    if (activeFile === undefined) return null
    // filter numeric number and sequence number
    const filteredNumber = combinedKeysIntoArray(activeFile?.data)
    const analysisResults = analyzeNonSequentialData(filteredNumber)
    return (
        <table className="bg-white border solid border-black">
            <thead>
                <tr>
                    <th style={cellStyle}>Key</th>
                    <th style={cellStyle}>Value (Mean)</th>
                    <th style={cellStyle}>Value (Standard Deviation)</th>
                </tr>
            </thead>
            <tbody>
                {analysisResults.map((result) => (
                    <tr key={result.key}>
                        <td style={cellStyle}>{result.key}</td>
                        <td style={cellStyle}>{result.mean !== null ? result.mean : "No data"}</td>
                        <td style={cellStyle}>{result.standardDeviation !== null ? result.standardDeviation : "No data"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

}

const cellStyle: React.CSSProperties = {
    border: "1px solid black",
    padding: "8px",
    textAlign: "center",
};
export default MeanChart