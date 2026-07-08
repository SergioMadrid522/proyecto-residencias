import { prisma } from "@/lib/prisma";
import { findProjectById } from "@/services/ticket.service";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const validation = await findProjectById(body.id);

    if (!validation) {
      return NextResponse.json(
        { message: "Proyecto no encontrado" },
        { status: 400 },
      );
    }

    await prisma.proyecto.update({
      where: { id: body.id },
      data: {
        activo: false,
      },
    });

    return NextResponse.json(
      { message: "Se ha eliminado el proyecto" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Internal Server" },
      { status: 500 },
    );
  }
}
