import getSession from "@/helpers/getSession";
import { prisma } from "@/lib/prisma";
import { findTicketById } from "@/services/ticket.service";
import { findUserById } from "@/services/user.service";
import { AIPrompt, GetTicketResponse, GetUserResponse } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

export async function getUserById(id: number): Promise<GetUserResponse> {
  try {
    const user = await findUserById(id);

    if (!user) {
      throw Error("Usuario no encontrado");
    }

    return {
      success: true,
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
      where: { activo: true },
      select: {
        id: true,
        titulo: true,
        estado: true,
        prioridad: true,
        fechaCreacion: true,
        usuarioAsignado: {
          select: { nombre: true },
        },
      },
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
      include: {
        usuarioAsignado: { select: { nombre: true } },
        proyecto: { select: { nombreProyecto: true } },
        historial: true,
      },
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

export async function getProjects() {
  try {
    const projects = await prisma.proyecto.findMany({
      where: { activo: true },
    });

    return {
      success: true,
      projects,
    };
  } catch {
    throw Error("Error al obtener los usuarios.");
  }
}

export async function getProject(id: number) {
  try {
    const project = await prisma.proyecto.findUnique({
      where: { id: id },
    });

    if (!project) {
      return {
        success: false,
        error: "El proyecto seleccionado no existe",
      };
    }

    return {
      success: true,
      project,
    };
  } catch {
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
    ASIGNADO: "Asignado",
    EN_CORRECCION: "En corrección",
    EN_PRUEBAS: "En pruebas",
    REABIERTO: "Reabierto",
    CERRADO: "Cerrado",
    CANCELADO: "Cancelado",
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

export function severityStyles(severidad: string): string {
  const severityColor: Record<string, string> = {
    CRITICA: "text-red-500",
    ALTA: "text-red-500",
    MEDIA: "text-[#3b82f6]",
    BAJA: "text-green-800",
  };
  return severityColor[severidad] ?? "text-black-500";
}

export function getTimeToCurrentDate(fechaCambio: Date) {
  const time = formatDistanceToNow(new Date(fechaCambio), {
    addSuffix: true,
    locale: es,
  });
  return time;
}

export function getStatusBoolean(status: number): boolean {
  const statusBoolean: Record<number, boolean> = {
    0: true,
    1: false,
  };
  return statusBoolean[status] ?? 0;
}

export function getFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase();
}

export function getPrompt(data: AIPrompt): string {
  const prompt = `
  Eres un clasificador de severidad de bugs/incidencias.

  Tu única función es analizar la información proporcionada y responder EXCLUSIVAMENTE con una de estas 4 palabras:

  BAJA
  MEDIA
  ALTA
  CRITICA

  No agregues explicaciones, comentarios, puntuación, markdown, comillas ni texto adicional.

  Reglas de clasificación:

  CRITICA:
  - El sistema está caído o una funcionalidad principal no puede utilizarse.
  - Existe pérdida, corrupción o riesgo de pérdida de datos.
  - Existe una vulnerabilidad de seguridad.
  - Bloquea operaciones importantes sin alternativa viable.

  ALTA:
  - Una funcionalidad importante está rota.
  - Afecta a varios usuarios o un módulo importante.
  - Existe una solución temporal o workaround parcial.

  MEDIA:
  - Afecta una funcionalidad secundaria.
  - Existe un workaround claro.
  - El impacto está limitado a pocos usuarios.

  BAJA:
  - Errores visuales, textos incorrectos, estilos, mejoras menores.
  - No afecta la funcionalidad principal.

  Considera también el módulo afectado:
  - BASE_DE_DATOS: problemas de datos aumentan la severidad.
  - API/BACKEND: errores de comunicación o servicios aumentan la severidad.
  - FRONTEND: distingue entre errores visuales y errores funcionales.
  - MOBILE: considera el impacto en usuarios móviles.

  Analiza estos campos:
  - titulo
  - descripcion
  - pasosReproducir
  - modulo

  Responde únicamente con:
  BAJA, MEDIA, ALTA o CRITICA.

  Datos del ticket:

  titulo:
  ${data.titulo}

  descripcion:
  ${data.descripcion}

  pasosReproducir:
  ${data.pasosReproducir}

  modulo:
  ${data.modulo}
`;
  return prompt;
}
