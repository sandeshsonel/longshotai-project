import React, { useState, lazy } from "react";
import { Box, styled, useMediaQuery } from "@mui/material";
import { Switch, Route } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

import IconButton from "@mui/material/IconButton";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";

import routes from "routes";

const DashboardSidebar = lazy(() => import("./DashboardSidebar"));
const DashboardNavbar = lazy(() => import("./DashboardNavbar"));

const DashboardLayoutRoot = styled("div")(() => ({
   display: "flex",
   flex: "1 1 auto",
   maxWidth: "100%",
   maxHeight: "100%",
}));

const DashboardLayout = ({ history }) => {
   const [isSidebarOpen, setSidebarOpen] = useState(true);
   const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
      defaultMatches: true,
      noSsr: false,
   });

   return (
      <>
         <PerfectScrollbar>
            <DashboardLayoutRoot
               className={isSidebarOpen && lgUp ? "pl-72" : ""}
            >
               <Box
                  sx={{
                     display: "flex",
                     flex: "1 1 auto",
                     flexDirection: "column",
                     width: "100%",
                  }}
               >
                  {(!isSidebarOpen || !lgUp) && (
                     <DashboardNavbar
                        onSidebarOpen={() => setSidebarOpen(!isSidebarOpen)}
                     />
                  )}
                  <div className="pb-8 px-3 xl:px-3 py-2 xl:py-2">
                     <Switch>
                        {routes.map((route, i) => {
                           return route.component ? (
                              <Route
                                 key={i}
                                 exact={true}
                                 path={`/longshot/app${route.path}`}
                                 render={(props) => (
                                    <route.component {...props} />
                                 )}
                              />
                           ) : null;
                        })}
                     </Switch>
                  </div>
               </Box>
            </DashboardLayoutRoot>
            <DashboardSidebar
               history={history}
               onClose={() => setSidebarOpen(!isSidebarOpen)}
               open={isSidebarOpen}
            />
         </PerfectScrollbar>
         <div className="fixed bottom-6 right-6">
            <IconButton>
               <HelpOutlinedIcon
                  className="bg-white"
                  fontSize="large"
                  color="primary"
               />
            </IconButton>
         </div>
      </>
   );
};

export default DashboardLayout;
