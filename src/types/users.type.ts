import { z } from "zod";
import { loginSchema } from "@/schemas/login.schema";

export type LoginValidationProps = z.infer<typeof loginSchema>;
