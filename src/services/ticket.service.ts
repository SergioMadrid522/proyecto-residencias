import { prisma } from "@/lib/prisma";
import { createTicketSchema } from "@/schemas/project.schema";
import { CreateTicketProps } from "@/types/types";

export async function createTicket(data: unknown) {
  const result = createTicketSchema.safeParse(data);

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

export async function findTicketById(id: number | undefined) {
  return await prisma.ticket.findUnique({ where: { id } });
}

export async function ticketTimeline(id: number) {
  return await prisma.historial_ticket.findMany({
    take: 5,
    where: { ticketId: id },
    orderBy: { fechaCambio: "desc" },
    include: {
      ticket: {
        select: {
          id: true,
          proyecto: true,
          usuarioReporta: true,
          estado: true,
          prioridad: true,
          ultimaActualizacion: true,
        },
      },
    },
  });
}
