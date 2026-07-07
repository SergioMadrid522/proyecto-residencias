import { ValidatePassword } from "@/schemas/validatePassword.schema";
import { getUserPassword } from "./user.service";
import * as bcrypt from "bcrypt";

export async function validatePassword(id: number, data: unknown) {
  const user = await getUserPassword(id);
  const result = ValidatePassword.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  if (!user) {
    return {
      success: false,
      errors: "El usuario no existe",
    };
  }
  const { actualPassword } = result.data;

  const isMatch = await bcrypt.compare(actualPassword, user.password);

  if (!isMatch) {
    return {
      success: false,
      errors: "La contraseña actual no coincide",
    };
  }
  return {
    result,
  };
}
