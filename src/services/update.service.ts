import type { UpdateUserData } from "@/types/types";
import { hashPassword } from "@/utils/hashPassword";
import { findUserById } from "./user.service";

export async function updateUserData(body: UpdateUserData) {
  if (!body) throw new Error("Por favor rellena todos los campos.");

  const user = await findUserById(body.id);
  if (!user) throw new Error("Usuario no encontrado");

  const { id, rol, password, ...dataToUpdate } = body;

  let hashedPassword;
  if (password) {
    hashedPassword = await hashPassword(password);
  }

  return {
    id,
    rol,
    dataToUpdate,
    hashedPassword,
  };
}
