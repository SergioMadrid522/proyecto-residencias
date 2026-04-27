import getSession from "@/helpers/getSession";
import { prisma } from "@/lib/prisma";
import { findTicketById } from "@/services/ticket.service";
import { findUserById } from "@/services/user.service";
import { GetTicketResponse, GetUserResponse } from "@/types";

export async function getUserById(id: number): Promise<GetUserResponse> {
  try {
    const user = await findUserById(id);

    if (!user) {
      throw Error("Usuario no encontrado");
    }

    return {
      success: true,
      id,
      user: [user],
    };
  } catch {
    throw Error("Error al buscar el usuario");
  }
}

export async function getTicketById(id: number): Promise<GetTicketResponse> {
  try {
    const ticket = await findTicketById(id);

    if (!ticket) {
      throw Error("Ticket no encontrado");
    }

    return {
      success: true,
      id,
    };
  } catch {
    throw Error("Error al buscar el ticket");
  }
}

export async function getUsers(): Promise<GetUserResponse> {
  try {
    const user = await prisma.usuario.findMany({ where: { activo: true } });
    return {
      success: true,
      user,
    };
  } catch {
    throw Error("Error al obtener los usuarios.");
  }
}

export async function getTickets() {
  try {
    const tickets = await prisma.ticket.findMany({
      include: { usuarioAsignado: true },
    });

    return {
      success: true,
      tickets,
    };
  } catch (error) {
    return {
      success: false,
      error: "Error al obtener los datos.",
    };
  }
}

export async function getTicket(id: number) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: id },
      include: { usuarioAsignado: true, proyecto: true },
    });

    return {
      success: true,
      ticket,
    };
  } catch (error) {
    return {
      success: false,
      error: "Error al obtener los datos.",
    };
  }
}
export async function getUserSession() {
  const session = await getSession();
  let usuario = "user";
  let lastname = "user";
  let rolTexto = "unkown";
  let rolId = 3;

  if (session?.userId) {
    const user = await prisma.usuario.findUnique({
      where: { id: session.userId, rolId: session.userRole },
      select: { nombre: true, rol: true, lastname: true },
    });

    if (user) {
      usuario = user.nombre;
      lastname = user.lastname!;
      rolTexto = user.rol.nombreRol;
      rolId = user.rol.id;
    }
  }
  return {
    user: {
      id: session?.userId,
      name: usuario,
      lastname: lastname,
    },
    rolId: rolId,
    rol: rolTexto,
  };
}

export function getTicketModule(module: string): string {
  const moduleText: Record<string, string> = {
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    API: "API",
    MOBILE: "Mobile",
    BASE_DE_DATOS: "Base de datos",
  };
  return moduleText[module] ?? module;
}

export function getTicketStatus(status: string): string {
  const statusText: Record<string, string> = {
    PENDIENTE: "Pendiente",
    EN_REVISION: "En revisión",
    EN_CORRECCION: "En corrección",
    REABIERTO: "Reabierto",
    CERRADO: "Cerrado",
  };
  return statusText[status] ?? status;
}

export function getTicketLevel(value: string): string {
  const levels: Record<string, string> = {
    BAJA: "Baja",
    MEDIA: "Media",
    ALTA: "Alta",
    CRITICA: "Crítica",
  };
  return levels[value] ?? value;
}

export function getRolText(rolId: number): string {
  const rolText: Record<number, string> = {
    1: "Admin",
    2: "Dev",
    3: "Tester",
  };
  return rolText[rolId] ?? "unknown";
}

export function getFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase();
}
