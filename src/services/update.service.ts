import type { UpdateUserData } from "@/types/types";
import { hashPassword } from "@/utils/hashPassword";
import { findUserById } from "./user.service";
import { getStatusBoolean } from "@/utils/getFunctions";
import { findProjectById } from "./ticket.service";
import { Project } from "@/types";

export async function updateUserData(data: UpdateUserData) {
  const user = await findUserById(data.id);

  if (!user) throw new Error("Usuario no encontrado");

  const { id, rol, password, status, ...dataToUpdate } = data;

  let hashedPassword;

  if (password) {
    hashedPassword = await hashPassword(password);
  }
  const userStatus = await getStatusBoolean(status);

  return {
    id,
    rol,
    userStatus,
    dataToUpdate,
    hashedPassword,
  };
}

export async function updateProjectData(data: Project) {
  const project = await findProjectById(data.id);
  if (!project) throw new Error("Proyecto no encontrado");

  const projectStatus = getStatusBoolean(data.status);
  const { id, nombreProyecto, descripcion } = data;

  return {
    success: true,
    id,
    nombreProyecto,
    descripcion,
    projectStatus,
  };
}
