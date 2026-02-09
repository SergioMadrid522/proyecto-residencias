import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Introduce un correo válido." })
      .max(320),
    password: z.string().max(50),
  })
  .superRefine((data, ctx) => {
    const { password } = data;

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
  });
