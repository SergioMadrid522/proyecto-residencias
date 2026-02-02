// app/actions.ts
"use server";
import { prisma } from "@/lib/prisma";

export async function getData() {
  return prisma.rol.findMany();
}
