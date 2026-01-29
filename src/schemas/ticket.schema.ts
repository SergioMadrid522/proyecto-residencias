import { z } from "zod";
const ticketSchema = z.object({
  titulo: z.string().min(1, { message: "Ingresa un titulo." }).max(100),
  descripcion: z
    .string()
    .min(1, { message: "Ingresa una descripción" })
    .max(500),
  pasos_reproducir: z
    .string()
    .min(1, { message: "Ingresa una descripción" })
    .max(500),
  modulo: z.enum(["Frontend", "Backend", "API", "Mobile", "Base de Datos"]),
  prioridad: z.enum(["Baja", "Media", "Alta", "Crítica"]),
  severidad_ia: z.enum(["Baja", "Media", "Alta", "Crítica"]), //será manual primero,
});

/* 
CREATE TYPE priority AS ENUM ('Baja', 'Media', 'Alta', 'Crítica');
CREATE TYPE state AS ENUM('Pendiente', 'En Revisión', 'En Corrección', 'Reabierto', 'Cerrado');
*/
