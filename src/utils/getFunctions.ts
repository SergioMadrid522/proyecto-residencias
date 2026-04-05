import getSession from "@/helpers/getSession";
import { prisma } from "@/lib/prisma";

export async function getUsers() {
  try {
    const users = await prisma.usuario.findMany();

    return {
      success: true,
      users,
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

export async function getUserSession() {
  const session = await getSession();
  let usuario = "user";
  let rolTexto = "unkown";
  let rolId = 3;

  if (session?.userId) {
    const user = await prisma.usuario.findUnique({
      where: { id: session.userId, rolId: session.userRole },
      select: { nombre: true, rol: true },
    });

    if (user) {
      usuario = user.nombre;
      rolTexto = user.rol.nombreRol;
      rolId = user.rol.id;
    }
  }
  return {
    username: usuario,
    rolId: rolId,
    rol: rolTexto,
  };
}
