import { z } from "zod";
import { loginSchema } from "@/schemas/login.schema";
import { registerSchema } from "@/schemas/register.schema";

export type LoginValidationProps = z.infer<typeof loginSchema>;
export type RegisterUser = z.infer<typeof registerSchema>;

export type RegisterResult =
  | { success: false; errors: Record<string, string[]> }
  | {
      success: true;
      data: {
        nombre: string;
        email: string;
        rolId: number;
        password: string;
      };
    };
