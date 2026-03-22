import { ticketSchema } from "@/schemas/project.schema";
import { CreateTicketProps } from "@/types/types";

export async function createTicket(data: unknown): Promise<CreateTicketProps> {
  const result = ticketSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }
  const {
    titulo,
    descripcion,
    pasosReproducir,
    modulo,
    prioridad,
    estado,
    severidadIa,
    proyectoId,
    usuarioReportaId,
    usuarioAsignadoId,
  } = result.data;

  return {
    success: true,
    data: {
      titulo,
      descripcion,
      pasosReproducir,
      modulo,
      prioridad,
      estado,
      severidadIa,
      proyectoId,
      usuarioReportaId,
      usuarioAsignadoId,
    },
  };
}
