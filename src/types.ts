import { Modulo, Prioridad, Estado } from "@prisma/client";

export type RolText = "unkown" | "Admin" | "Dev" | "Tester";
/*
type Prioridad = "CRITICA" | "ALTA" | "MEDIA" | "BAJA";
type Estado =
  | "PENDIENTE"
  | "EN_REVISION"
  | "EN_CORRECCION"
  | "REABIERTO"
  | "CERRADO"; 
*/
interface User {
  id: number;
  nombre: string;
}

type Severidad = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";

export type StatsOverview = {
  icon: string;
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
  icon: string;
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
export interface Username {
  user: User[];
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
  | { type: "create" }
  | { type: "edit"; user: any }
  | null;
