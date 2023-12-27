import path from "path";
import Dashboard from "../dashboard";
import Schedule from "../schedule";
import Settings from "../settings";

// ICON

import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ArticleIcon from "@mui/icons-material/Article";
import EventNoteIcon from "@mui/icons-material/EventNote";

type Routes = {
  name: string;
  link: string;
  icon: React.ComponentType;
  component: React.ComponentType;
  divider: boolean;
};

const routes: Routes[] = [
  {
    name: "Dashboard",
    link: "/dashboard",
    component: Dashboard,
    icon: DashboardIcon,
    divider: false,
  },
  {
    name: "Schedule",
    link: "/schedule",
    component: Schedule,
    icon: EventNoteIcon,
    divider: false,
  },
  {
    name: "Settings",
    link: "/settings",
    component: Settings,
    icon: SettingsApplicationsIcon,
    divider: false,
  },
];

export default routes;
