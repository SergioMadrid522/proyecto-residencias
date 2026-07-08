import z from "zod";

export const EditUser = z
  .object({
    nombre: z.string().trim().max(50),
    email: z
      .string()
      .trim()
      .email({ message: "Introduce un correo válido." })
      .max(320),
    password: z.string().trim().max(50).optional(),
    status: z.number(),
    rol: z.number().int(),
  })
  .superRefine((data, ctx) => {
    const { nombre, rol } = data;

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
    if (rol <= 0 || rol > 3) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Ingresa un rol valido.",
        path: ["rol"],
      });
    }
  });
