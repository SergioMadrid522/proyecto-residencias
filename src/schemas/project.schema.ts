import { z } from "zod";

export const projectSchema = z
  .object({
    nombreProyecto: z
      .string({ message: "Tiene que ser texto." })
      .trim()
      .max(200),
    descripcion: z.string({ message: "Tiene que ser texto." }).trim().max(500),
    //ticket: z.string({ message: "Tiene que ser texto." }).max(200),
  })
  .superRefine((data, ctx) => {
    const { nombreProyecto, descripcion } = data;

    if (nombreProyecto === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El proyecto debe tener un titulo.",
        path: ["nombreProyecto"],
      });
    }
    if (nombreProyecto.length >= 1 && nombreProyecto.length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El nombre del proyecto es muy corto.",
        path: ["nombreProyecto"],
      });
    }
    if (descripcion === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El proyecto debe tener una descripción.",
        path: ["descripcion"],
      });
    }
    if (descripcion.length >= 1 && descripcion.length <= 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La descripción es muy corta.",
        path: ["descripcion"],
      });
    }
    /* 
      if (ticket === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El proyecto debe estar asignado a una",
          path: ["descripcion"],
        });
      } 
    */
  });
import { Modulo, Prioridad, Estado } from "@prisma/client";
export const ticketSchema = z
  .object({
    titulo: z.string({ message: "Tiene que ser texto." }).trim().max(100),
    descripcion: z.string({ message: "Tiene que ser texto." }).trim().max(500),
    pasosReproducir: z.string().trim().max(500),
    modulo: z.nativeEnum(Modulo),
    prioridad: z.nativeEnum(Prioridad),
    estado: z.nativeEnum(Estado),
    severidadIa: z.enum(["Baja", "Media", "Alta", "Crítica"]), //será manual primero,
    proyectoId: z.int(),
    usuarioReportaId: z.int(),
    usuarioAsignadoId: z.int(),
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
        path: ["pasosReproducir"],
      });
    }
    if (pasosReproducir.length >= 1 && pasosReproducir.length <= 15) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Escribe al menos un paso para reproducir el bug.",
        path: ["pasosReproducir"],
      });
    }
  });

/* 
  Type '"Pendiente" | "En Revisión" | "En Correción" | "Reabierto" | "Cerrado"' is not assignable to type 'Estado'.
  Type '"En Correción"' is not assignable to type 'Estado'. Did you mean '"En Corrección"'?
*/
