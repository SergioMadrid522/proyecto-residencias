import { z } from "zod";
import { registerSchema, loginSchema } from "@/schemas/auth.schema";
import { projectSchema } from "@/schemas/project.schema";

export type LoginValidationProps = z.infer<typeof loginSchema>;
export type RegisterUser = z.infer<typeof registerSchema>;
export type Proyecto = z.infer<typeof projectSchema>;
