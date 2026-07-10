import type { LeftSideMenuOption, OptionMenu, StatsOverview } from "@/types";
import { GLOBAL } from "./icons.data";
import {
  getOpenTickets,
  getReviewTickets,
  getCriticalTickets,
  getMTTR,
  getPieChartData,
} from "./rechartsData/getDashboardData";
import { icons } from "@/icons";

export const leftSideMenuOptions: LeftSideMenuOption = {
  admin: <OptionMenu[]>[
    {
      label: "Dashboard",
      link: "/",
      icon: icons.dashboardIcon,
      viewbox: "0 0 640 640",
    },
    {
      label: "Proyectos",
      link: "/projects",
      icon: "",
      viewbox: "0 0 16 16",
    },
    {
      label: "Tickets",
      link: "/tickets",
      icon: icons.ticketsIcon,
      viewbox: "0 0 640 640",
    },
    {
      label: "Usuarios",
      link: "/users",
      icon: icons.usersIcon,
      viewbox: "0 0 16 16",
    },
    {
      label: "Configuración",
      link: "/settings",
      icon: icons.settingsIcon,
      viewbox: "0 0 16 16",
    },
  ],
  tester: <OptionMenu[]>[
    {
      label: "Tickets",
      link: "/tickets",
      icon: icons.ticketsIcon,
      viewbox: "0 0 640 640",
    },
    {
      label: "Configuración",
      link: "/settings",
      icon: icons.settingsIcon,
      viewbox: "0 0 16 16",
    },
  ],
  dev: <OptionMenu[]>[
    {
      label: "Tickets",
      link: "/tickets",
      icon: icons.ticketsIcon,
      viewbox: "0 0 640 640",
    },
    {
      label: "Configuración",
      link: "/settings",
      icon: icons.settingsIcon,
      viewbox: "0 0 16 16",
    },
  ],
};
