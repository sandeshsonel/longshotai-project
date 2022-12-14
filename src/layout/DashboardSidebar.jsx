import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Icon } from "@iconify/react";
import { useHistory, Link } from "react-router-dom";

import { Box, Drawer, useMediaQuery, Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

import companyLogo from "assets/icons/company-logo.svg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MapIcon from "@mui/icons-material/Map";
import FlagIcon from "@mui/icons-material/Flag";

import NavItem from "./NavItem";
import SubNavItem from "./SubNavItem";

import sidebarRoutes from "routes/sidebar";

const DashboardSidebar = (props) => {
   const { open, onClose } = props;
   const history = useHistory();
   const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
      defaultMatches: true,
      noSsr: false,
   });

   const content = (
      <PerfectScrollbar component="div">
         <Box
            sx={{
               display: "flex",
               flexDirection: "column",
               justifyContent: "space-between",
               height: "100%",
               width: "280px",
            }}
         >
            <Box sx={{ flexGrow: 1 }}>
               <Link to="/longshot/home">
                  <div className="flex items-center justify-center border-b py-2">
                     <img
                        className="w-48"
                        src={companyLogo}
                        alt="company-logo"
                     />
                  </div>
               </Link>
               <Link to="/longshot/app/project">
                  <button
                     onClick={() => {
                        if (!lgUp) props.onClose();
                     }}
                     className={`${
                        window.location.pathname.includes("project")
                           ? "bg-gray-200"
                           : "bg-white"
                     } text-left px-4 w-full py-2 hover:bg-gray-100`}
                  >
                     <div className="text-gray-500 text-sm font-medium">
                        Project
                     </div>
                     <div className="text-black text-tiny font-medium">
                        My First Project
                     </div>
                  </button>
               </Link>
               <div sx={{ flexGrow: 1 }}>
                  {sidebarRoutes.map((route, idx) => (
                     <div key={idx}>
                        {route.lineBreak && <hr className="mb-3 mt-3" />}
                        {route.routes ? (
                           <SubNavItem
                              onClose={onClose}
                              key={route.name}
                              route={route}
                           />
                        ) : (
                           <NavItem
                              onClose={onClose}
                              key={route.name}
                              icon={route.icon}
                              href={route.path}
                              title={route.name}
                           />
                        )}
                     </div>
                  ))}
               </div>
               <hr className="mb-3 mt-3" />
            </Box>
            <Box className="sticky bottom-0 bg-white w-full border-t p-2">
               <div className="space-y-2 bg-blue-100 rounded-md p-3">
                  <div className="flex items-start space-x-2">
                     <Avatar sx={{ bgcolor: deepPurple[500] }}>Ks</Avatar>
                     <div>
                        <div className="text-tiny font-medium text-black">
                           kritikalpa.saha
                        </div>
                        <div className="text-sm text-gray-500">
                           Credits Used:313.2
                        </div>
                     </div>
                  </div>
                  <button className="flex items-center justify-center space-x-1 w-full bg-green-600 text-white py-2 rounded-md text-sm-tiny font-medium">
                     <ShoppingCartIcon sx={{ width: "20px" }} />
                     <span>Change Plan</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1 w-full text-gray-600 py-2 rounded-md text-sm-tiny font-medium">
                     <MapIcon sx={{ width: "20px" }} />
                     <span>Change Plan</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1 w-full text-gray-600 py-2 rounded-md text-sm-tiny font-medium">
                     <FlagIcon sx={{ width: "20px" }} />
                     <span>What's New?</span>
                  </button>
               </div>
               <button
                  onClick={() => onClose()}
                  className="flex items-center space-x-2 w-full text-gray-600 py-2 px-2 mt-2 hover:bg-gray-200 rounded-md text-sm font-medium"
               >
                  <Icon className=" text-2xl" icon="mdi:keyboard-tab-reverse" />
                  <span className="font-medium">Collapse</span>
               </button>
            </Box>
         </Box>
      </PerfectScrollbar>
   );

   if (lgUp) {
      return (
         <Drawer
            anchor="left"
            open={open}
            PaperProps={{
               sx: {
                  backgroundColor: "#fff",
                  color: "#fff",
                  width: 280,
               },
            }}
            variant={open && lgUp ? "permanent" : "persistent"}
         >
            {content}
         </Drawer>
      );
   }
   return (
      <Drawer
         anchor="left"
         onClose={onClose}
         open={open}
         PaperProps={{
            sx: {
               backgroundColor: "#fff",
               color: "#FFFFFF",
               width: 280,
            },
         }}
         sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
         variant="temporary"
      >
         {content}
      </Drawer>
   );
};

export default DashboardSidebar;
