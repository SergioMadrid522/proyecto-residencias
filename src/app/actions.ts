// app/actions.ts
"use server";
import * as bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/login.schema";
import { registerSchema } from "@/schemas/register.schema";
import { signJwt } from "@/utils/jwt";
import { setSessionCookie } from "@/utils/setSessionCookies";
import { hashPassword } from "@/utils/hashPassword";
import { RegisterResult } from "@/types/users.type";

export async function findUserByEmail(email: string | undefined) {
  return await prisma.usuario.findUnique({
    where: { email },
  });
}

export async function loginUser(data: unknown) {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const user = await prisma.usuario.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      success: false,
      errors: "Credenciales inválidas",
    };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return {
      success: false,
      errors: "Credenciales inválidas",
    };
  }

  const token = await signJwt({
    userId: user.id,
    userRole: user.rolId,
  });

  await setSessionCookie(token);

  return {
    success: true,
  };
}

export async function registerUser(data: unknown): Promise<RegisterResult> {
  const result = registerSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { password, nombre, email, rol } = result.data;
  const hashedPassword = await hashPassword(password);

  return {
    success: true,
    data: {
      nombre,
      email,
      rolId: rol,
      password: hashedPassword,
    },
  };
}
