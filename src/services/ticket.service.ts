import { prisma } from "@/lib/prisma";
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

export async function findTicketByName(tituloTicket: string | undefined) {
  const result = await prisma.ticket.findFirst({
    where: { titulo: tituloTicket },
    select: { id: true },
  });
  return result ? result.id : null;
}
