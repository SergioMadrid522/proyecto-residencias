import { prisma } from "@/lib/prisma";
import { getTicketById } from "@/utils/getFunctions";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();
  const validation = await getTicketById(body.id);
  if (!validation) {
    return NextResponse.json(
      {
        success: false,
        message: "No se encontró ningún ticket con ese id",
      },
      { status: 401 },
    );
  }
  try {
    await prisma.ticket.update({
      where: { id: validation.id },
      data: { activo: false },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Se elimino con éxito",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting canceled tickets:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
