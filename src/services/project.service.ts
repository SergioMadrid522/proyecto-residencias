import { CreateProjectProps } from "@/types/types";
import { findProyectByName } from "./user.service";
import { projectSchema } from "@/schemas/project.schema";

export async function createProject(
  data: unknown,
): Promise<CreateProjectProps> {
  const result = projectSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const existedProject = await findProyectByName(result.data.nombreProyecto);

  if (existedProject) {
    return {
      success: false,
      errors: "El nombre del proyecto ya existe",
    };
  }

  const { nombreProyecto, descripcion } = result.data;
  return {
    success: true,
    data: {
      nombreProyecto,
      descripcion,
    },
  };
}
