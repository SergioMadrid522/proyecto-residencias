import { z } from "zod";
import { loginSchema } from "@/schemas/login.schema";
import { registerSchema } from "@/schemas/register.schema";
import { projectSchema } from "@/schemas/project.schema";

export type LoginValidationProps = z.infer<typeof loginSchema>;
export type RegisterUser = z.infer<typeof registerSchema>;
export type Proyecto = z.infer<typeof projectSchema>;
