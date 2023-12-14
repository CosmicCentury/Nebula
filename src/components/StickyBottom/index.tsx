import Box from "@mui/material/Box";
import React from "react";

interface StickyBottomProps {
  children: React.ReactNode;
}

const StickyBottom: React.FC<StickyBottomProps> = ({ children }) => {
  return (
    <Box
      sx={{
        bottom: 0,
        position: "fixed",
        left: "50%",
        transform: "translate(-50%, 0)",
        margin: "20px",
      }}
    >
      {children}
    </Box>
  );
};

export default StickyBottom;
