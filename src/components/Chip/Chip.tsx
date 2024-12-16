import React from "react";

export interface ChipProps {
  label: string;
}
const Chip: React.FC<ChipProps> = ({ label }) => {
  return (
    <div className="inline-flex items-center px-2 py-1 text-sm text-white bg-blue-500 rounded-full ml-2">
      {label}
    </div>
  );
};

export default Chip;
