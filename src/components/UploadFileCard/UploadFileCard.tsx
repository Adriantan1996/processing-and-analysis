import React, { useState } from "react";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { addFile, setActiveFile } from "../../state/uploadSlice";
import { v4 as uuid } from "uuid";
import isValidFileExtension from "./utils/isValidFileExtension";

// eslint-disable-next-line react-refresh/only-export-components
export enum UploadStatus {
  Uploading = "uploading",
  Success = "success",
  Error = "error",
}

const UploadFileCard: React.FC = () => {
  const dispatch = useDispatch(); // reducer for store file to local store
  const [status, setStatus] = useState<UploadStatus | null>(null); // Track upload status
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track error messages

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidFile = isValidFileExtension(file.name);
    // check for valid file extension
    if (!isValidFile) {
      setStatus(UploadStatus.Error);
      setErrorMessage("Invalid file type. Please upload a CSV file.");
      return;
    }
    setStatus(UploadStatus.Uploading); // Set status to uploading

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          const fileId = uuid();
          const newFile = {
            id: fileId,
            name: file.name,
            data: result.data,
          };

          dispatch(addFile(newFile)); // Save file to store
          dispatch(setActiveFile(fileId)); // Set new file as active file
          setStatus(UploadStatus.Success); // Set status to success
        } catch (error) {
          setStatus(UploadStatus.Error); // Set status to error
          setErrorMessage(`Failed to upload file. Please try again. ${error}`);
        }
      },
      error: (error) => {
        setStatus(UploadStatus.Error); // Set status to error
        setErrorMessage(`Error parsing file: ${error.message}`);
      },
    });
  };

  return (
    <div className="flex flex-col items-center p-4 my-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <label className="flex flex-col items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
        <span>Upload CSV File</span>
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileUpload}
        />
      </label>
      <div className="text-center">
        {status === UploadStatus.Uploading && (
          <p className="text-blue-500">Uploading file...</p>
        )}
        {status === UploadStatus.Success && (
          <p className="text-green-500">File uploaded successfully!</p>
        )}
        {status === UploadStatus.Error && (
          <p className="text-red-500">
            {errorMessage || "An error occurred during upload."}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadFileCard;
