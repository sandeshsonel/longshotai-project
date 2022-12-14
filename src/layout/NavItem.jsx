import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useHistory } from "react-router-dom";

import { useMediaQuery } from "@mui/material";

const NavItem = (props) => {
   const { href, icon, title } = props;
   const history = useHistory();
   const active = href ? window.location.pathname === href : false;
   const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
      defaultMatches: true,
      noSsr: false,
   });

   return (
      <Link className="w-full" to={href ? href : "#"}>
         <button
            onClick={() => {
               if (!lgUp) {
                  href && props.onClose();
               }
            }}
            className={`${
               active
                  ? "bg-gray-200 text-primary font-semiBold"
                  : "text-gray-500 bg-white hover:bg-gray-100 text-dark-green"
            } flex items-center justify-between pl-3 w-full py-2 rounded-l-md mt-2`}
         >
            <div className="flex items-center space-x-3">
               <Icon className="text-xl xl:text-2xl" icon={icon} />
               <span className="font-semiBold text-tiny">{title}</span>
            </div>
         </button>
      </Link>
   );
};

export default NavItem;
