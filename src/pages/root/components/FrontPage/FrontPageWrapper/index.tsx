import React, { PropsWithChildren } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";

interface FrontPageWrapper {
  children: React.ReactNode;
}

const FrontPageWrapper: React.FC<PropsWithChildren<FrontPageWrapper>> = ({
  children,
  ...rest
}) => {
  return (
    <Container disableGutters={true} maxWidth={"xl"} {...rest}>
      <CssBaseline />
      {children}
    </Container>
  );
};

export default FrontPageWrapper;
