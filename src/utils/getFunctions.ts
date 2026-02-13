import { prisma } from "@/lib/prisma";

export async function getUsers() {
  try {
    const users = await prisma.usuario.findMany();

    return {
      success: true,
      data: {
        users,
      },
    };
  } catch {
    throw Error("Error al obtener los usuarios.");
  }
}

export async function getTickets() {
  try {
    const tickets = await prisma.ticket.findMany();

    return {
      success: true,
      data: {
        tickets,
      },
    };
  } catch {
    throw Error("Error al obtener los tickets.");
  }
}
