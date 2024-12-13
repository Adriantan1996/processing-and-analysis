import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import refractorHeaderName from "./utils/refractorHeaderName";
import getDataType from "./utils/getDataType";
import Chip from "../Chip/Chip";

const DataTable: React.FC = () => {
  const files = useSelector((state: RootState) => state.csv.files);
  const activeFileId = useSelector(
    (state: RootState) => state.csv.activeFileId
  );

  const activeFile = files.find((file) => file.id === activeFileId);

  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc" | null;
  }>({ key: null, direction: null });

  const columns = useMemo(
    () => (activeFile ? Object.keys(activeFile.data[0] || {}) : []),
    [activeFile]
  );

  const sortedData = useMemo(() => {
    if (activeFile && sortConfig.key && sortConfig.direction) {
      const sorted = [...activeFile.data].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortConfig.direction === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }

        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();

        if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
        if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });

      return sorted;
    }

    return activeFile ? activeFile.data : [];
  }, [activeFile, sortConfig]);

  const handleSort = (column: string) => {
    setSortConfig((prev) => {
      if (prev.key === column) {
        const nextDirection =
          prev.direction === "asc"
            ? "desc"
            : prev.direction === "desc"
            ? null
            : "asc";
        return { key: nextDirection ? column : null, direction: nextDirection };
      }
      return { key: column, direction: "asc" };
    });
  };

  return (
    <div className="w-full">
      {!activeFile ? (
        <div>Select a file to view its data.</div>
      ) : (
        <>
          <h2 className="w-full py-2 text-left text-lg font-semibold">
            {activeFile.name}
          </h2>
          <div className="flex flex-col w-full h-96 overflow-x-auto overflow-y-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <table className="w-full text-left table-auto">
              <thead>
                <tr>
                  {columns.map((column) => {
                    const firstRowValue = activeFile?.data[0][column];
                    const dataType = getDataType(firstRowValue);

                    return (
                      <th
                        key={column}
                        className="px-2 py-2 text-left border-b bg-gray-100 text-xs sm:text-sm md:text-base sticky top-0 z-10 cursor-pointer space-x-2"
                        onClick={() => handleSort(column)}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-2">
                          <span>{refractorHeaderName(column)}</span>
                          <Chip label={dataType} />
                        </div>
                        {sortConfig.key === column && (
                          <span className="ml-2">
                            {sortConfig.direction === "asc"
                              ? "↑"
                              : sortConfig.direction === "desc"
                              ? "↓"
                              : ""}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {columns.map((column) => (
                      <td
                        key={column}
                        className="px-2 py-2 border-b text-xs sm:text-sm md:text-base"
                      >
                        {row[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
