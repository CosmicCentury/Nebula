import React from "react";
import clsx from "clsx";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ArticleIcon from "@mui/icons-material/Article";
import menuList from "./menu.json";

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { drawerWidth } from "../..";

interface SideMenuProps {
  open: boolean;
  setOpen: (newState: boolean) => void;
}

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  divider?: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  height: "48px",
  padding: theme.spacing(0, 1),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const ImportIcon = (iconName: string) => {
  switch (iconName) {
    case "DashboardIcon":
      return <DashboardIcon />;
    case "EventNoteIcon":
      return <EventNoteIcon />;
    case "SettingsApplicationsIcon":
      return <SettingsApplicationsIcon />;
    case "MarkdownEditorIcon":
      return <ArticleIcon />;
    default:
      return <QuestionMarkIcon />;
  }
};

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to, divider = false } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>(
        function Link(itemProps, ref) {
          return (
            <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
          );
        }
      ),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} divider={divider}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const SideMenu: React.FC<SideMenuProps> = ({ open = false, setOpen }) => {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={open} sx={{ zIndex: 0 }}>
      <DrawerHeader>
        {/* <IconButton onClick={() => setOpen(!open)}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton> */}
      </DrawerHeader>
      {/* <Divider /> */}
      <List component="nav">
        {menuList.map((x, index) => (
          <ListItemLink
            key={index}
            divider={x.divider}
            to={x.link}
            primary={x.name}
            icon={ImportIcon(x.icon)}
          />
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;
