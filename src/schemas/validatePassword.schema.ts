import z from "zod";

export const ValidatePassword = z.object({
  actualPassword: z
    .string()
    .min(8, {
      message: "La contraseña actual debe tener un mínimo de 8 carácteres",
    })
    .max(50)
    .trim(),
  newPassword: z
    .string()
    .min(8, {
      message: "La nueva contraseña debe tener un mínimo de 8 carácteres",
    })
    .max(50)
    .trim(),
});
