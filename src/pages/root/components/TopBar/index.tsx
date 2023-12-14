import React, { useEffect } from "react";
import clsx from "clsx";
import AppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled, createTheme } from "@mui/material/styles";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import { useNavigate } from "react-router";
import { drawerWidth, PageInfomationContext } from "../..";
import usePageInformationContext from "../../../../hooks/usePageInformationContext";
import { useQuery, useQueryClient } from "react-query";
import * as services from "../../../../services";
import { UserInfoResponse } from "../../../../services/users";

interface TopBarProps {
  open: boolean;
  setOpen: (newState: boolean) => void;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const ModifiedAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: "rgb(18, 18, 18)",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopBar: React.FC<TopBarProps> = ({ open = false, setOpen }) => {
  const queryClient = useQueryClient();

  const appbarHeight = "48px";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // eslint-disable-next-line no-unused-vars
  const [profileName, setProfileName] = React.useState<string>("");
  const [roleName, setRoleName] = React.useState<string>("");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  React.useEffect(() => {
    const cookieUser = localStorage.getItem("user");
    if (cookieUser) {
      const { firstName, roleName } = JSON.parse(cookieUser);
      setProfileName(firstName);
      setRoleName(roleName);
    } else {
      const user = queryClient.getQueryData<UserInfoResponse>(["user"]);
      if (user) {
        setProfileName(user.firstName);
        setRoleName(user.roleName);
      }
    }
  }, [queryClient.getQueryData(["user"])]);

  const usePageInfoContext = usePageInformationContext();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "rgb(18, 18, 18)",
        height: appbarHeight,
      }}
    >
      <Toolbar variant="dense">
        {/* <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(!open)}
          edge="start"
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton> */}

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            textShadow: `0 0 0.125em`,
          }}
        >
          {usePageInfoContext.pageTitle}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <Grid
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <AccountCircle />
            <Typography style={{ padding: 10 }} variant="caption">
              {`${profileName} | ${roleName}`}
            </Typography>
          </Grid>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
