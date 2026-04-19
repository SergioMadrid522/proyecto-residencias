import { z } from "zod";
import { createUserSchema, loginSchema } from "@/schemas/auth.schema";
import { projectSchema } from "@/schemas/project.schema";

export type LoginValidationProps = z.infer<typeof loginSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type Proyecto = z.infer<typeof projectSchema>;
