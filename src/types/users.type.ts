import { z } from "zod";
import { createUserSchema, loginSchema } from "@/schemas/auth.schema";
import { projectSchema } from "@/schemas/project.schema";
import { ticketSchema } from "@/schemas/ticket.schema";
import { ValidatePassword } from "@/schemas/validatePassword.schema";

export type LoginValidationProps = z.infer<typeof loginSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type Proyecto = z.infer<typeof projectSchema>;
export type TicketSchema = { ticket: z.infer<typeof ticketSchema> };
export type ValidatePassword = z.infer<typeof ValidatePassword>;
