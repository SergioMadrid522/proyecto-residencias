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

/* 
  1. usuario da click al boton de crear ticket
  2. usuario llena la info del ticket
    2.1. llena titulo y valida si esta vacio o no (zod)
    2.2. llena descripcion y valida si esta vacio o no (zod)
    2.3. llena los pasos a reproducir(que es un texto) (zod)
    2.4. escoje el modulo ["Frontend", "Backend", "API", "Mobile", "Base de Datos"]
        una vez que escoje el modulo, valida si existe
          si:
            pasa a validar la prioridad
              una vez que escoje la prioridad, valida si existe
              si:
                pasa a validar la severidad
                  una vez que escoje la severidad, valida si existe
                      si:
                        <pasa al paso 3>
                      no:
                        manda error y no se guarda
              no:
                manda error y no se guarda
          no:
          manda error y no se guarda
3. se guarda el ticket


{
    "titulo": "string",
    "descripcion": "string",
    "pasos_reproducir": "string",
    "modulo": "Frontend",
    "prioridad": "Baja" ,
    "severidad_ia": "Baja"
}
*/
