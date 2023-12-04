"use client";
import { Metadata } from "next/types";
import { Inter } from "next/font/google";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TopBar from "../component/TopBar";
import * as React from "react";

const inter = Inter({ subsets: ["latin"] });

const LINKS = [
  { text: "Home", href: "/", icon: HomeIcon },
  { text: "Scheduler", href: "/scheduler", icon: StarIcon },
  { text: "Tasks", href: "/tasks", icon: ChecklistIcon },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [open, setOpen] = React.useState<boolean>(true);
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <title>Raphael C</title>
      <head>
        <link rel="icon" href="/icon2.ico" sizes="any" />
      </head>

      <body className={inter.className}>
        <TopBar />
        <List>
          {LINKS.map(({ text, href, icon: Icon }) => (
            <ListItem key={href} disablePadding>
              <ListItemButton component={Link} href={href}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {children}
      </body>
    </html>
  );
}
