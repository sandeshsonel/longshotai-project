import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Collapse, useMediaQuery } from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLessRounded";
import ExpandMore from "@mui/icons-material/ExpandMoreRounded";
import semrushIcon from "assets/icons/semrush-logo.svg";

const SubNavItem = ({ route, onClose }) => {
   const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
   const active = route.href ? window.location.pathname === route.href : false;
   const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
      defaultMatches: true,
      noSsr: false,
   });

   function handleDropdownMenuClick() {
      setIsDropdownMenuOpen(!isDropdownMenuOpen);
   }
   return (
      <>
         <button
            className="flex items-center justify-between px-3 mt-2 w-full max-w-full py-2 rounded-md"
            onClick={handleDropdownMenuClick}
         >
            <div
               className={`${
                  active ? "text-primary" : "text-gray-500"
               } flex items-center space-x-3 w-full`}
            >
               <Icon icon={route.icon} className="text-xl xl:text-2xl" />
               <span className="font-semiBold text-tiny">{route.name}</span>
            </div>
            {isDropdownMenuOpen ? (
               <ExpandLess className="text-gray-500" />
            ) : (
               <ExpandMore className="text-gray-500" />
            )}
         </button>

         <Collapse in={isDropdownMenuOpen} timeout="auto" unmountOnExit>
            <div className="space-y-2 mt-2">
               {route.routes.map((r, idx) => (
                  <Link key={idx} className="w-full mt-2" to={r.path}>
                     <button
                        onClick={!lgUp && onClose}
                        className={`${
                           active
                              ? "text-primary bg-darkGreen font-semiBold text-dark-green"
                              : "text-gray-500 bg-white hover:bg-gray-100 text-dark-green"
                        } flex items-center justify-between pl-3 ml-2 px-4 w-full mt-2 py-2 rounded-l-md`}
                     >
                        <div className="flex items-center space-x-3">
                           {r.icon ? (
                              <Icon
                                 className="text-xl xl:text-2xl"
                                 icon={r.icon}
                              />
                           ) : (
                              <img src={semrushIcon} alt="semrushIcon" />
                           )}
                           <span className="font-semiBold text-tiny text-dark-green">
                              {r.name}
                           </span>
                        </div>
                     </button>
                  </Link>
               ))}
            </div>
         </Collapse>
      </>
   );
};

export default SubNavItem;
