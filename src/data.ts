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
const openTicketsCount = await getOpenTickets();
const rewiewTicketCount = await getReviewTickets();
export const pieChartData = await getPieChartData();
const criticalTicketCount = await getCriticalTickets();
const mttr = await getMTTR();

export const statsOverview: StatsOverview[] = [
  {
    icon: GLOBAL.reportsIcon,
    iconViewbox: "0 0 640 640",
    title: "Tickets Abiertos",
    color: "#F54927",
    stats: openTicketsCount,
  },
  {
    icon: GLOBAL.sandClockIcon,
    iconViewbox: "0 0 16 16",
    title: "Tickets En Revisión",
    color: "#E0AF0B",
    stats: rewiewTicketCount,
  },
  {
    icon: GLOBAL.fireIcon,
    iconViewbox: "0 0 16 16",
    title: "Tickets con prioridad Crítica",
    color: "#F54927",
    stats: criticalTicketCount,
  },
  {
    icon: GLOBAL.clockIcon,
    iconViewbox: "0 0 16 16",
    title: "MTTR Promedio",
    color: "#66B555",
    stats: mttr,
  },
];
