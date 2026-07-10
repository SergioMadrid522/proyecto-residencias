import { prisma } from "@/lib/prisma";
import { ErrorTrendData, RecentTicket } from "@/types";
/* Overview Stats */
export async function getOpenTickets() {
  const count = await prisma.ticket.count({
    where: {
      activo: true,
      NOT: {
        estado: {
          in: ["CANCELADO", "CERRADO"],
        },
      },
    },
  });
  return count;
}

export async function getReviewTickets() {
  const count = await prisma.ticket.count({
    where: {
      estado: "EN_REVISION",
      activo: true,
    },
  });
  return count;
}

export async function getCriticalTickets() {
  const count = await prisma.ticket.count({
    where: { prioridad: "CRITICA", activo: true },
  });
  return count;
}

export async function getMTTR() {
  let totalHours = 0;
  let resolvedTickets = 0;

  const tickets = await prisma.ticket.findMany({
    where: {
      estado: "CERRADO",
    },
    select: {
      fechaCreacion: true,
      historial: {
        where: {
          estadoNuevo: "CERRADO",
        },
        take: 1,
        orderBy: {
          fechaCambio: "asc",
        },
        select: {
          fechaCambio: true,
        },
      },
    },
  });

  for (const ticket of tickets) {
    const closedDate = ticket.historial[0];

    if (!closedDate) continue;

    const diff =
      closedDate.fechaCambio.getTime() - ticket.fechaCreacion.getTime();

    totalHours += diff / (1000 * 60 * 60);
    resolvedTickets++;
  }
  const mttr = resolvedTickets > 0 ? totalHours / resolvedTickets : 0;

  return Number(mttr.toFixed(2));
}

/* PIE CHART */
export async function getPieChartData() {
  const reopenCount = await prisma.ticket.count({
    where: { estado: "REABIERTO", activo: true },
  });

  const closedCount = await prisma.ticket.count({
    where: { estado: "CERRADO", activo: true },
  });

  return [
    { name: "Reabiertos", value: reopenCount },
    { name: "Cerrados", value: closedCount },
  ];
}

export async function getReopenPercentage() {
  const reopenedTickets = await prisma.ticket.count({
    where: {
      estado: "REABIERTO",
      activo: true,
    },
  });

  const closedTickets = await prisma.ticket.count({
    where: {
      estado: "CERRADO",
      activo: true,
    },
  });

  const totalResolvedTickets = reopenedTickets + closedTickets;

  if (totalResolvedTickets === 0) return 0;

  return Number(((reopenedTickets / totalResolvedTickets) * 100).toFixed(2));
}
/* Simple graph chart */
export async function getErrorTrend(): Promise<ErrorTrendData[]> {
  const tickets = await prisma.ticket.findMany({
    where: {
      activo: true,
    },
    select: {
      fechaCreacion: true,
      prioridad: true,
    },
  });

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const data = tickets.reduce(
    (acc, ticket) => {
      const month = months[ticket.fechaCreacion.getMonth()];

      if (!acc[month]) {
        acc[month] = {
          name: month,
          criticos: 0,
          medios: 0,
          leves: 0,
        };
      }

      switch (ticket.prioridad) {
        case "CRITICA":
          acc[month].criticos++;
          break;

        case "MEDIA":
          acc[month].medios++;
          break;

        case "BAJA":
          acc[month].leves++;
          break;
      }

      return acc;
    },
    {} as Record<
      string,
      {
        name: string;
        criticos: number;
        medios: number;
        leves: number;
      }
    >,
  );

  return Object.values(data);
}
/* Recent Tickets */
export async function getRecetTickets(): Promise<RecentTicket[]> {
  const data = await prisma.ticket.findMany({
    take: 4,
    where: { activo: true },
    select: {
      id: true,
      titulo: true,
      severidadIa: true,

      historial: {
        orderBy: {
          fechaCambio: "desc",
        },
        take: 1,
        select: {
          fechaCambio: true,
        },
      },
    },
  });
  return data;
}

/* Simple bar graph */

export async function getUnstableModules() {
  const tickets = await prisma.ticket.findMany({
    where: {
      activo: true,
    },
    select: {
      modulo: true,
    },
  });

  const modules = {
    FRONTEND: 0,
    BACKEND: 0,
    API: 0,
    MOBILE: 0,
    BASE_DE_DATOS: 0,
  };

  tickets.forEach(({ modulo }) => {
    modules[modulo]++;
  });

  const colors = {
    FRONTEND: "#4b5563",
    BACKEND: "#ef4444",
    BASE_DE_DATOS: "#f59e0b",
    API: "#3b82f6",
    MOBILE: "#4ade80",
  };

  const names = {
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    BASE_DE_DATOS: "Database",
    API: "API",
    MOBILE: "Mobile",
  };

  return Object.entries(modules).map(([key, value]) => ({
    name: names[key as keyof typeof names],
    value,
    color: colors[key as keyof typeof colors],
  }));
}
