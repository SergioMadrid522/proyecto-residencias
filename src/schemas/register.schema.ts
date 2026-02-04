import { z } from "zod";

/* 

gte(): Greater than or equal to the smallest 5 digit int
lte(): Less than or equal to the largest 5 digit int
*/
export const registerSchema = z.object({
  nombre: z
    .string()
    .min(1, { message: "Ingresa un nombre al usuario." })
    .max(50),
  email: z
    .string()
    .min(1, { message: "Introduce un correo válido." })
    .email({ message: "Introduce un correo válido." })
    .max(320),
  password: z
    .string()
    .min(1, { message: "La contraseña es obligatoria." })
    .min(3, { message: "La contraseña es muy corta." })
    .max(50),
  rol: z.coerce.number().int().gte(1).lte(3),
});
