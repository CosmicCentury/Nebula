import React from "react";
import { useLocation } from "react-router-dom";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Typography from "@mui/material/Typography";

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <Typography variant="h5">{title}</Typography>;
};

export default PageTitle;
