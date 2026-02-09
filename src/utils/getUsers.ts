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
