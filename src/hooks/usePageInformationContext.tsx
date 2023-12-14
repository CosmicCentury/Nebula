import React from "react";
import { PageInfomationContext } from "../pages/root";

const usePageInformationContext = () => {
  const pageInfoContext = React.useContext(PageInfomationContext);

  const { pageTitle, changePageTitle } = pageInfoContext;

  return { pageTitle, changePageTitle };
};

export default usePageInformationContext;
