import { z } from "zod";

export const ticketSchema = z
  .object({
    titulo: z.string({ message: "Tiene que ser texto." }).max(100),
    descripcion: z.string({ message: "Tiene que ser texto." }).max(500),
    pasosReproducir: z.string({ message: "Tiene que ser texto." }).max(500),
    modulo: z.enum(["Frontend", "Backend", "API", "Mobile", "Base de Datos"]),
    prioridad: z.enum(["Baja", "Media", "Alta", "Crítica"]),
    estado: z.enum([
      "Pendiente",
      "En Revisión",
      "En Corrección",
      "Reabierto",
      "Cerrado",
    ]),
    severidad_ia: z.enum(["Baja", "Media", "Alta", "Crítica"]), //será manual primero,
  })
  .superRefine((data, ctx) => {
    const { titulo, descripcion, pasosReproducir } = data;

    if (titulo === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El ticket debe llevar un titulo.",
        path: ["titulo"],
      });
    }
    if (titulo.length >= 1 && titulo.length <= 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El titulo del ticket es muy corto.",
        path: ["titulo"],
      });
    }
    if (descripcion === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El ticket debe llevar una descripcion.",
        path: ["descripcion"],
      });
    }
    if (descripcion.length >= 1 && descripcion.length <= 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La descripción del ticket es muy corta.",
        path: ["descripcion"],
      });
    }
    if (pasosReproducir === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "El ticket debe llevar al menos un paso para reproducir el bug.",
        path: ["pasos_reproducir"],
      });
    }
    if (pasosReproducir.length >= 1 && pasosReproducir.length <= 15) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Escribe al menos un paso para reproducir el bug.",
        path: ["pasos_reproducir"],
      });
    }
  });

/* 
  Type '"Pendiente" | "En Revisión" | "En Correción" | "Reabierto" | "Cerrado"' is not assignable to type 'Estado'.
  Type '"En Correción"' is not assignable to type 'Estado'. Did you mean '"En Corrección"'?
  
  
  */
