import React, { useState } from "react";
import Sidebar from "../components/SideBar/SideBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`bg-gray-800 text-white transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        } p-5 z-10 h-auto min-h-screen`}
      >
        <Sidebar onToggle={handleSidebarToggle} />
      </div>

      <div className={`flex-1 bg-gray-100 transition-all duration-300`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
