import { z } from "zod";

export const projectSchema = z
  .object({
    nombreProyecto: z.string({ message: "Tiene que ser texto." }).max(200),
    descripcion: z.string({ message: "Tiene que ser texto." }).max(500),
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
    /*     if (ticket === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El proyecto debe estar asignado a una",
        path: ["descripcion"],
      });
    } */
  });
