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
