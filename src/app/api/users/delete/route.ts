import { prisma } from "@/lib/prisma";
import { findUserById } from "@/services/user.service";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const validation = await findUserById(Number(body.id));

    if (!validation) {
      return NextResponse.json(
        { message: "No se encontro el usuario." },
        { status: 401 },
      );
    }

    await prisma.usuario.update({
      where: { id: validation.id },
      data: {
        activo: false,
      },
    });

    return NextResponse.json(
      { message: "El usuario se ha borrado exitosamente" },
      { status: 200 },
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "Error del servidor", error },
      { status: 500 },
    );
  }
}
