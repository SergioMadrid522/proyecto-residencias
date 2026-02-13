// app/actions.ts
"use server";
import * as bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/login.schema";
import { registerSchema } from "@/schemas/register.schema";
import { signJwt } from "@/utils/jwt";
import { setSessionCookie } from "@/utils/setSessionCookie";
import { hashPassword } from "@/utils/hashPassword";
import { RegisterResult, TicketRegister } from "@/types/types";
import { cookies } from "next/headers";
import { ticketSchema } from "@/schemas/ticket.schema";
import { projectSchema } from "@/schemas/project.schema";
import { Project } from "@/types/types";

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

export async function signOut() {
  (await cookies()).delete("sessionCookie");
}

export async function createTicket(data: unknown): Promise<TicketRegister> {
  const result = ticketSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }
  const {
    titulo,
    descripcion,
    pasosReproducir,
    modulo,
    prioridad,
    estado,
    severidad_ia,
  } = result.data;

  return {
    success: true,
    data: {
      titulo,
      descripcion,
      pasosReproducir,
      modulo,
      prioridad,
      estado,
      severidad_ia,
    },
  };
}

export async function createProject(data: unknown): Promise<Project> {
  const result = projectSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { nombreProyecto, descripcion } = result.data;
  return {
    success: true,
    data: {
      nombreProyecto,
      descripcion,
    },
  };
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
