import { ModalState, Ticket } from "@/types";

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

/* 
type Modulo = "Frontend" | "Backend" | "API" | "Mobile" | "Base de Datos";

type Prioridad = "Baja" | "Media" | "Alta" | "Crítica";

type Estado =
  | "Pendiente"
  | "En Revisión"
  | "En Corrección"
  | "Reabierto"
  | "Cerrado";
 */

export type CreateTicketProps =
  | { success: false; errors: Record<string, string[]> }
  | {
      success: true;
      data: Ticket;
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
  modal: ModalState;
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
};

export type ActionProps = {
  id: number;
};
