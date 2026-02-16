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

type Modulo = "Frontend" | "Backend" | "API" | "Mobile" | "Base de Datos";

type Prioridad = "Baja" | "Media" | "Alta" | "Crítica";

type Estado =
  | "Pendiente"
  | "En Revisión"
  | "En Corrección"
  | "Reabierto"
  | "Cerrado";

type SeveridadIa = "Baja" | "Media" | "Alta" | "Crítica";

export type CreateTicketProps =
  | { success: false; errors: Record<string, string[]> }
  | {
      success: true;
      data: {
        titulo: string;
        descripcion: string;
        pasos_reproducir: string;
        modulo: Modulo;
        prioridad: Prioridad;
        estado: Estado;
        severidad_ia: SeveridadIa;
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
