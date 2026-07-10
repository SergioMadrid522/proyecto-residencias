import { Modulo, Prioridad, Estado } from "@prisma/client";
import { ReactNode } from "react";
import { CreateTicket } from "./types/users.type";

export type RolText = "unkown" | "Admin" | "Dev" | "Tester";

export interface ErrorTrendData {
  name: string;
  criticos: number;
  medios: number;
  leves: number;
}
export type RecentTicket = {
  id: number;
  titulo: string;
  severidadIa: string | null;
  historial: {
    fechaCambio: Date;
  }[];
};
export interface ProjectData {
  id: number;
  nombreProyecto: string;
  descripcion: string | null;
  activo: boolean;
}

export interface ResultProjects {
  success: boolean;
  projects: ProjectData[];
}
interface User {
  id: number;
  nombre: string;
  lastname?: string;
}
interface Projects {
  id: number;
  nombreProyecto: string;
}
export interface CreateTicketProps {
  user: User[];
  rol: string;
  projects: Projects[];
}
export type Severidad = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";

export type StatsOverview = {
  icon: () => ReactNode;
  iconViewbox: string;
  title: string;
  color: string;
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
  severidadIa?: Severidad;
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
export interface EditTicketModal {
  user: User[];
  rol: string;
  projects: Projects[];
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
export interface EditButtonProps {
  id: number;
  user: User[];
  rol: string;
  projects: Projects[];
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
  | { type: "create-project" }
  | { type: "edit-project"; project: { id: number } }
  | null;

export type UserContext =
  | { type: "inactive-users" }
  | { type: "active-users" }
  | null;

export interface UserSettingsProps {
  user: {
    nombre: string;
    email: string;
    password: string;
    id: number;
    lastname: string | null;
    rolId: number;
    fechaRegistro: Date;
    activo: boolean;
  } | null;
}

export interface Project {
  id: number;
  nombreProyecto: string;
  descripcion: string;
  status: number;
}

export interface AIPrompt {
  titulo: string | undefined;
  descripcion: string | undefined;
  pasosReproducir: string;
  modulo: "FRONTEND" | "BACKEND" | "API" | "MOBILE" | "BASE_DE_DATOS";
}

export type ValidationResult =
  | {
      success: true;
      output: string;
    }
  | {
      success: false;
      error: string;
      status: number;
    };

export type CreateTicketResult =
  | {
      success: true;
      data: CreateTicket;
    }
  | {
      success: false;
      errors: string;
    };

export type TicketTable = {
  id: number;
  titulo: string;
  prioridad: "BAJA" | "MEDIA" | "ALTA" | "CRITICA";
  estado:
    | "PENDIENTE"
    | "EN_REVISION"
    | "ASIGNADO"
    | "EN_CORRECCION"
    | "EN_PRUEBAS"
    | "REABIERTO"
    | "CERRADO"
    | "CANCELADO";
  fechaCreacion: Date;
  usuarioAsignado: {
    nombre: string;
  };
};

export type GetTicketsResult =
  | {
      success: true;
      tickets: TicketTable[];
    }
  | {
      success: false;
      error: string;
    };

export type TicketTimelineItem = {
  id: number;
  usuario: {
    rol: {
      id: number;
      nombreRol: string;
    };
    nombre: string;
  };
  ticket: {
    id: number;
    proyecto: {
      id: number;
      activo: boolean;
      descripcion: string | null;
      nombreProyecto: string;
    };
    prioridad: "BAJA" | "MEDIA" | "ALTA" | "CRITICA";
    estado:
      | "PENDIENTE"
      | "EN_REVISION"
      | "ASIGNADO"
      | "EN_CORRECCION"
      | "EN_PRUEBAS"
      | "REABIERTO"
      | "CERRADO"
      | "CANCELADO";
    ultimaActualizacion: Date;
    usuarioReporta: {
      id: number;
      nombre: string;
      lastname: string | null;
      email: string;
      password: string;
      rolId: number;
      fechaRegistro: Date;
      activo: boolean;
    } | null;
  };
  usuarioId: number;
  estadoNuevo: string;
  fechaCambio: Date;
};
