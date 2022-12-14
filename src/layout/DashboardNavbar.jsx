import React from "react";

import { IconButton } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const DashboardNavbar = ({ onSidebarOpen }) => {
  return (
    <div className="flex shadow z-50 static bg-white top-0 w-full px-3 py-2">
      <IconButton onClick={onSidebarOpen}>
        <MenuOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default DashboardNavbar;
