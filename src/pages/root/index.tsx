import React, { Suspense, lazy } from "react";
import RouteList from "./components/Routes";
import TopBar from "./components/TopBar";
import { BrowserRouter, Route, Routes, useMatch } from "react-router-dom";
import { DrawerHeader } from "./components/SideMenu";

import LazyPageLoader from "../../components/LazyPageLoader/index";
import { CssBaseline, Box, useTheme } from "@mui/material";
import SideMenu from "./components/SideMenu";
import Container from "@mui/material/Container";
import FrontPageWrapper from "./components/FrontPage/FrontPageWrapper";
import CustomRoute from "./components/CustomRoutes";
import NotFound from "../../components/NotFoundPage";

export const drawerWidth = 240;

const Login = lazy(() => import("./components/FrontPage/Login"));

interface PageInformationContextProps {
  pageTitle: string;
  changePageTitle: (pageTitle: string) => void;
}

export const PageInfomationContext =
  React.createContext<PageInformationContextProps>({
    pageTitle: "",
    changePageTitle: () => {},
  });

const DefaultContainer = () => {
  const [open, setOpen] = React.useState<boolean>(true);

  const [pageTitle, setPageTitle] = React.useState<string>("");

  const changePageTitle = React.useCallback((pageTitle: string) => {
    setPageTitle(pageTitle);
  }, []);

  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <PageInfomationContext.Provider
        value={{
          pageTitle: pageTitle,
          changePageTitle,
        }}
      >
        <TopBar open={open} setOpen={setOpen} />
        <SideMenu open={open} setOpen={setOpen} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <RouteList />
        </Box>
      </PageInfomationContext.Provider>
    </Box>
  );
};

const Root: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<LazyPageLoader />}>
          <Routes>
            <Route path="/main/*" element={<DefaultContainer />} />
            <Route path={`/login`} element={<Login />} />
            {/* <CustomRoute path={`/login`} pageTitle="Login" element={Login} /> */}
            {/* <CustomRoute path={`/signup`} pageTitle="Sign Up" element={Login} /> */}
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
};

export default Root;
