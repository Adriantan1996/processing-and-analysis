import React, { useState } from "react";
import { CsvFile } from "../../state/uploadSlice";
import refractorHeaderName from "../DataTable/utils/refractorHeaderName";
/**
 * @param 
 * File data
 * select colum handler
 * isModalOpen flag 
 * openModal function 
 * closeModal Function
 * @return
 */
export interface ModalProps {
  file: CsvFile | undefined;
  onColumnSelect: (xColumn: string, yColumn: string) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  file,
  onColumnSelect,
  isModalOpen,
  closeModal,
}) => {
  const [selectedXColumn, setSelectedXColumn] = useState<string>("");
  const [selectedYColumn, setSelectedYColumn] = useState<string>("");

  if (!isModalOpen || !file) return null;

  const columns = file.data.length > 0 ? Object.keys(file.data[0]) : [];

  const handleSubmit = () => {
    if (selectedXColumn && selectedYColumn) {
      onColumnSelect(selectedXColumn, selectedYColumn);
      closeModal(); // Close the modal
    } else {
      alert("Please select both X and Y columns.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-90 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3 z-50">
        <h2 className="text-xl font-bold mb-4">Select Columns for Chart</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            X-Axis Column
          </label>
          <select
            value={selectedXColumn}
            onChange={(e) => setSelectedXColumn(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {refractorHeaderName(col)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Y-Axis Column
          </label>
          <select
            value={selectedYColumn}
            onChange={(e) => setSelectedYColumn(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a column</option>
            {columns.map((col) => (
              <option key={col} value={col}>
                {refractorHeaderName(col)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
