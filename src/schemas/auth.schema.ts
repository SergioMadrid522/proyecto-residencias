import { z } from "zod";

/* 
  gte(): Greater than or equal to the smallest 5 digit int
  lte(): Less than or equal to the largest 5 digit int
*/

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Introduce un correo válido." })
    .max(320),
  password: z
    .string()
    .trim()
    .min(1, { message: "La contraseña es obligatoria" }),
});

export const createUserSchema = z
  .object({
    nombre: z.string().trim().max(50),
    email: z
      .string()
      .trim()
      .email({ message: "Introduce un correo válido." })
      .max(320),
    password: z.string().trim().max(50),
    rol: z.number().int(),
  })
  .superRefine((data, ctx) => {
    const { nombre, password, rol } = data;

    if (nombre.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El nombre de usuario es obligatorio.",
        path: ["nombre"],
      });
    }
    if (nombre.length >= 1 && nombre.length < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El nombre de usuario es muy corto (mínimo 4 caracteres).",
        path: ["nombre"],
      });
    }
    if (password.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La contraseña es obligatoria.",
        path: ["password"],
      });
    }
    if (password.length >= 1 && password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La contraseña es muy corta (mínimo 8 caracteres).",
        path: ["password"],
      });
    }
    if (rol <= 0 || rol > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Ingresa un rol valido.",
        path: ["rol"],
      });
    }
  });
