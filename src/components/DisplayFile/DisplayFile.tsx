import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../state/store";
import { deleteFile, setActiveFile } from "../../state/uploadSlice";
/**
 * @params NIL
 * All files is retrieve from store (csv)
 * Delete button is assign based on file index
 * @returns Array of file boxes with delete button tag to each file
 */
const DisplayFile: React.FC = () => {
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.csv.files); // retrieve file from redux store
  const activeFileId = useSelector(
    (state: RootState) => state.csv.activeFileId
  ); // retrieve active file id

  const handleDelete = (fileId: string) => {
    dispatch(deleteFile(fileId)); // Remove file from Redux store
  };

  return (
    <div className="flex flex-col gap-2 p-4 w-full max-w-full border border-gray-300 rounded-lg shadow-md bg-white">
      {files.length === 0 ? (
        <p className="text-center w-full text-gray-500">
          No files uploaded yet.
        </p>
      ) : (
        files.map((file) => (
          <div
            key={file.id}
            className={`flex justify-center items-center w-full bg-white border border-gray-300 rounded-lg shadow-lg p-2 ${
              file.id === activeFileId ? "!bg-blue-100" : "hover:bg-gray-200"
            }`}
            onClick={() => dispatch(setActiveFile(file.id))} // select active file
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-black mb-4">
                {file.name}
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(file.id);
                }}
                className="min-w-fit bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
              >
                <p className="text-lg font-semibold text-center px-4">Delete</p>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default DisplayFile;
