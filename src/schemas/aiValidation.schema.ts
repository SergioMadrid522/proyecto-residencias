import { z } from "zod";
export const aiValidation = z.object({
  titulo: z.string().trim(),
  descripcion: z.string().trim(),
  modulo: z.string().trim(),
});
