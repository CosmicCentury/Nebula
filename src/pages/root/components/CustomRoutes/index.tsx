import React from "react";
import { Route, useLocation, PathRouteProps, Outlet } from "react-router-dom";
import PageTitle from "../../../../components/PageTitle";
import usePageInformationContext from "../../../../hooks/usePageInformationContext";

interface RouteCustomProps extends PathRouteProps {
  pageTitle: string;
}

const RouteCustom: React.FC<RouteCustomProps> = ({
  element,
  pageTitle,
  path,
  ...rest
}) => {
  const location = useLocation();
  const usePageInfoContext = usePageInformationContext();

  React.useEffect(() => {
    document.title = pageTitle;
    usePageInfoContext.changePageTitle(pageTitle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return <Outlet />;
};

export default RouteCustom;
