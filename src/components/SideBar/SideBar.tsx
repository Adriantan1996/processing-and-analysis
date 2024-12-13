import React, { useState } from "react";
import UploadFileCard from "../UploadFileCard/UploadFileCard";
import DisplayFile from "../DisplayFile/DisplayFile";

interface SidebarProps {
  onToggle: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle(newIsOpen); // Pass isOpen state back to the parent Layout component
  };

  return (
    <div className="relative">
      <div>
        <div className="flex items-center mb-6">
          <button onClick={toggleSidebar} className="text-white">
            {isOpen ? "Close" : "Open"}
          </button>
        </div>
        {isOpen && (
          <>
            <UploadFileCard />
            <DisplayFile />
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
