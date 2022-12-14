
import "react-perfect-scrollbar/dist/css/styles.css";
import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";

import { LinearProgress, ThemeProvider, CssBaseline } from "@mui/material";
import { theme }  from "theme";

const DashboardLayout = lazy(() => import("layout/DashboardLayout"));

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Suspense fallback={<LinearProgress className="h-1" />}>
        <CssBaseline />
          <Router>
            <Switch>
              <Route path="/longshot/app" component={DashboardLayout} />
              <Redirect from="/" to="/longshot/app/project" />
            </Switch>
          </Router>
        </Suspense>
      </ThemeProvider>
    );
  }
}

export default App;
