import { z } from "zod";

export const ticketSchema = z.object({
  titulo: z.string().trim().min(1).max(200),
  descripcion: z
    .string()
    .trim()
    .min(1, { message: "Introduce una descripción válida" }),
  pasosReproducir: z
    .string()
    .trim()
    .min(1, { message: "Introduce una descripción válida" })
    .optional(),
  proyecto: z.array(
    z.string().min(1, { message: "Selecciona una opción válida" }),
  ),
  estatus: z.enum(
    [
      "PENDIENTE",
      "EN_REVISION",
      "ASIGNADO",
      "EN_CORRECCION",
      "EN_PRUEBAS",
      "REABIERTO",
      "CERRADO",
      "CANCELADO",
    ],
    {
      message: "Selecciona una opción válida",
    },
  ),
  prioridad: z.enum(["BAJA", "MEDIA", "ALTA", "CRITICA"], {
    message: "Selecciona una opción válida",
  }),
  severidad: z.enum(["BAJA", "MEDIA", "ALTA", "CRITICA"], {
    message: "Selecciona una opción válida",
  }),
  modulo: z.enum(["FRONTEND", "BACKEND", "API", "MOBILE", "BASE_DE_DATOS"], {
    message: "Selecciona una opción válida",
  }),
  usuarioAsignado: z.array(
    z.string().min(1, { message: "Selecciona una opción válida" }),
  ),
});
