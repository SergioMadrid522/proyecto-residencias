// app/actions.ts
"use server";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/login.schema";
import { registerSchema } from "@/schemas/register.schema";
import { success } from "zod";

export async function FindUserByEmail(email: string | undefined) {
  return await prisma.usuario.findUnique({
    where: { email },
  });
}

export async function LoginUser(data: unknown) {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

export async function RegisterUser(data: unknown) {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

/* export function VerifyPassword(password: string | undefined) {
  if (password) {
  }
} */

/* 
  1. email, password
  2. validatePassword()
*/
