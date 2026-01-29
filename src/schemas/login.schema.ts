import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string()
      .min(3, { message: "Introduce un correo válido" })
      .max(320),
    password: z.string().min(3).max(50),
  })
  .superRefine((data, cxt) => {
    const { email, password } = data;

    if (!email && !password) {
      cxt.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No puedes dejar los campos vacíos",
        path: ["email", "password"],
      });
    }
    if (!email) {
      cxt.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No puedes el email vacío",
        path: ["email"],
      });
    }
    if (!password) {
      cxt.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No puedes la contraseña vacía",
        path: ["password"],
      });
    }
  });
