import { CreateProjectProps, CreateProjectResult } from "@/types/types";
import { prisma } from "@/lib/prisma";

export async function createProject(
  data: CreateProjectProps,
): Promise<CreateProjectResult> {
  const existedProject = await findProyectByName(data.nombreProyecto);

  if (existedProject) {
    return {
      success: false,
      error: "El nombre del proyecto ya existe",
    };
  }

  return {
    success: true,
    data: {
      nombreProyecto: data.nombreProyecto,
      descripcion: data.descripcion,
      activo: data.activo,
    },
  };
}

export async function findProyectByName(nombreProyecto: string) {
  return await prisma.proyecto.findUnique({
    where: { nombreProyecto },
  });
}
