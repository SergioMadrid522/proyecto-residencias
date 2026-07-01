import { Modulo, Prioridad, Estado } from "@prisma/client";
import { ReactNode } from "react";

export type RolText = "unkown" | "Admin" | "Dev" | "Tester";

interface User {
  id: number;
  nombre: string;
}
export interface Username {
  user: User[];
}
type Severidad = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";

export type StatsOverview = {
  icon: () => ReactNode;
  iconViewbox: string;
  title: string;
  stats: number;
};

export type Ticket = {
  id: number;
  titulo: string;
  descripcion: string;
  pasosReproducir: string;
  modulo: Modulo;
  prioridad: Prioridad;
  estado: Estado;
  severidadIa: Severidad;
  proyectoId: number;
  usuarioAsignadoId: number;
};
export interface OptionMenu {
  label: string;
  link: string;
  icon: () => ReactNode;
  viewbox: string;
}

export interface LeftSideMenuOption {
  admin: OptionMenu[];
  dev: OptionMenu[];
  tester: OptionMenu[];
}

export interface GetAllTickets {
  success: boolean;
  error?: string;
  tickets?: Ticket[];
}
export interface GetTicket {
  success: boolean;
  error?: string;
  ticket?: Ticket;
}
export interface EditTicketModal {
  user: User[];
  rol: string;
}

export interface GetUserResponse {
  success: boolean;
  id?: number;
  user: {
    id: number;
    nombre: string;
    email: string;
    rolId: number;
    fechaRegistro: Date;
  }[];
}

export interface GetTicketResponse {
  success: boolean;
  id?: number;
}

export type ModalState =
  | { type: "create-user" }
  | { type: "edit-user"; user: { id: number } }
  | { type: "create-ticket" }
  | { type: "edit-ticket"; ticket: { id: number } }
  | { type: "export-to-excel" }
  | null;
