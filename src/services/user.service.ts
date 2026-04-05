import { prisma } from "@/lib/prisma";

export async function findUserByEmail(email: string | undefined) {
  return await prisma.usuario.findUnique({
    where: { email },
  });
}

export async function findUserById(id: number | undefined) {
  return await prisma.usuario.findUnique({ where: { id } });
}
