import type {
  LeftSideMenuOption,
  OptionMenu,
  StatsOverview,
  Ticket,
} from "@/types";
import { GLOBAL } from "./icons.data";

export const leftSideMenuOptions: LeftSideMenuOption = {
  admin: <OptionMenu[]>[
    {
      label: "Dashboard",
      link: "/",
      icon: GLOBAL.dashboardIcon,
      viewbox: "0 0 640 640",
    },
    {
      label: "Reportes",
      link: "/reports",
      icon: GLOBAL.reportsIcon,
      viewbox: "0 0 640 640",
    },
    {
      label: "Tickets",
      link: "/tickets",
      icon: GLOBAL.ticketsIcon,
      viewbox: "0 0 640 640",
    },
    {
      label: "Analytics",
      link: "/analytics",
      icon: GLOBAL.analyticsIcon,
      viewbox: "0 0 16 16",
    },
    {
      label: "Usuarios",
      link: "/users",
      icon: GLOBAL.usersIcon,
      viewbox: "0 0 16 16",
    },
    {
      label: "Configuración",
      link: "/settings",
      icon: GLOBAL.settingsIcon,
      viewbox: "0 0 16 16",
    },
  ],
  tester: <OptionMenu[]>[
    {
      label: "Tickets",
      link: "/tickets",
      icon: GLOBAL.ticketsIcon,
      viewbox: "0 0 640 640",
    },
    {
      label: "Configuración",
      link: "/settings",
      icon: GLOBAL.settingsIcon,
      viewbox: "0 0 16 16",
    },
  ],
  dev: <OptionMenu[]>[
    {
      label: "Tickets",
      link: "/tickets",
      icon: GLOBAL.ticketsIcon,
      viewbox: "0 0 640 640",
    },
    {
      label: "Configuración",
      link: "/settings",
      icon: GLOBAL.settingsIcon,
      viewbox: "0 0 16 16",
    },
  ],
};

export const statsOverview: StatsOverview[] = [
  {
    icon: GLOBAL.reportsIcon,
    iconViewbox: "0 0 640 640",
    title: "Bugs Abiertos",
    stats: 23,
  },
  {
    icon: GLOBAL.sandClockIcon,
    iconViewbox: "0 0 16 16",
    title: "En revisión",
    stats: 12,
  },
  {
    icon: GLOBAL.fireIcon,
    iconViewbox: "0 0 16 16",
    title: "Criticos",
    stats: 5,
  },
  {
    icon: GLOBAL.clockIcon,
    iconViewbox: "0 0 16 16",
    title: "MTTR Promedio",
    stats: 3.5,
  },
];

export const recentTickets: Ticket[] = [
  {
    id: 1026,
    titulo: "Error en login",
    severidad: "Alta",
    ultimaActualizacion: "10 min",
    link: "/user/admin/ticket/ticket",
  },
  {
    id: 10,
    titulo: "Error en login",
    severidad: "Media",
    ultimaActualizacion: "10 min",
    link: "/user/admin/ticket/ticket",
  },
  {
    id: 57,
    titulo: "Error en login",
    severidad: "Critica",
    ultimaActualizacion: "10 min",
    link: "/user/admin/ticket/ticket",
  },
  {
    id: 59,
    titulo: "Error en login",
    severidad: "Baja",
    ultimaActualizacion: "10 min",
    link: "/user/admin/ticket/ticket",
  },
];
