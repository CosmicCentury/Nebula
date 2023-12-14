import React, { lazy } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import CustomRoute from "../CustomRoutes";
import NotFound from "../../../../components/NotFoundPage";

const Dashboard = lazy(() => import("../../../dashboard"));

const Schedule = lazy(() => import("../../../schedule"));

const Settings = lazy(() => import("../../../settings"));

const markdowneditor = lazy(() => import("../../../markdown-editor"));

const RouteList: React.FC = () => {
  return (
    <Routes>
      {["/", "/dashboard"].map((path) => (
        <Route key={path} path={path} element={<Dashboard />} />
      ))}

      <Route path={`/schedule`} element={<Schedule />} />
      {/* <CustomRoute
        path={`/settings`}
        pageTitle="Settings"
        element={
          <React.Suspense fallback={<>...</>}>
            <Settings />
          </React.Suspense>
        }
      /> */}

      <Route path={`/*`} element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
};

export default RouteList;
