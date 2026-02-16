import { prisma } from "@/lib/prisma";

export async function findUserByEmail(email: string | undefined) {
  return await prisma.usuario.findUnique({
    where: { email },
  });
}

export async function findProyectByName(nombreProyecto: string | undefined) {
  return await prisma.proyecto.findUnique({
    where: { nombreProyecto },
  });
}

export async function findTicketByName(tituloTicket: string | undefined) {
  const result = await prisma.ticket.findFirst({
    where: { titulo: tituloTicket },
    select: { id: true },
  });
  return result ? result.id : null;
}
