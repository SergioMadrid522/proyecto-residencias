import { z } from "zod";

/* 

gte(): Greater than or equal to the smallest 5 digit int
lte(): Less than or equal to the largest 5 digit int
*/
export const registerSchema = z
  .object({
    nombre: z.string().max(50),
    email: z
      .string()
      .email({ message: "Introduce un correo válido." })
      .max(320),
    password: z.string().max(50),
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
    if (nombre.length < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El nombre de usuario es muy corto.",
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
        message: "La contraseña es muy corta.",
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
