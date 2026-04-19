export type RegisterUserProps =
  | { success: false; errors: Record<string, string[]> }
  | {
      success: true;
      data: {
        nombre: string;
        email: string;
        rolId: number;
        password: string;
      };
    };

// type Modulo = "Frontend" | "Backend" | "API" | "Mobile" | "Base de Datos";

/* type Prioridad = "Baja" | "Media" | "Alta" | "Crítica";

type Estado =
  | "Pendiente"
  | "En Revisión"
  | "En Corrección"
  | "Reabierto"
  | "Cerrado";
 */
type Severidad = "Baja" | "Media" | "Alta" | "Crítica";
import { Modulo, Prioridad, Estado } from "@prisma/client";

export type CreateTicketProps =
  | { success: false; errors: Record<string, string[]> }
  | {
      success: true;
      data: {
        titulo: string;
        descripcion: string;
        pasosReproducir: string;
        modulo: Modulo;
        prioridad: Prioridad;
        estado: Estado;
        severidadIa: Severidad;
        proyectoId: number;
        usuarioReportaId: number;
        usuarioAsignadoId: number;
      };
    };

export type CreateProjectProps =
  | { success: false; errors: Record<string, string[]> | string }
  | {
      success: true;
      data: {
        nombreProyecto: string;
        descripcion: string;
      };
    };

export type ModalContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export type ActionProps = {
  id: number;
};
