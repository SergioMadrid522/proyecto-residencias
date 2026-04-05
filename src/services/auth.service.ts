// app/actions.ts
"use server";
import * as bcrypt from "bcrypt";
import { createUserSchema, loginSchema } from "@/schemas/auth.schema";
import { signJwt } from "@/utils/jwt";
import { setSessionCookie } from "@/utils/setSessionCookie";
import { hashPassword } from "@/utils/hashPassword";
import { RegisterUserProps } from "@/types/types";
import { cookies } from "next/headers";
import { findUserByEmail } from "./user.service";

export async function loginUser(data: unknown) {
  const result = loginSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;

  const user = await findUserByEmail(email);
  if (!user) {
    return {
      success: false,
      errors: "Credenciales inválidas",
    };
  }

  const isMatch = await bcrypt.compare(password, user!.password);
  if (!isMatch) {
    return {
      success: false,
      errors: "Credenciales inválidas",
    };
  }

  const token = await signJwt({
    userId: user.id,
    userRole: user.rolId,
    userName: user.nombre,
  });

  await setSessionCookie(token);

  return {
    success: true,
  };
}

export async function createUser(data: unknown): Promise<RegisterUserProps> {
  const result = createUserSchema.safeParse(data);

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

export async function signOut() {
  (await cookies()).delete("sessionCookie");
}
