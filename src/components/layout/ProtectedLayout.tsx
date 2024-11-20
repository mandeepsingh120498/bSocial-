import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
import Bottombar from "../common/Bottombar";

const ProtectedLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Topbar />
        <div className="flex-grow">
          <Outlet/>
        </div>
        <Bottombar />
      </div>
    </div>
  );
};

export default ProtectedLayout;
