import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT() {
  try {
    const { count } = await prisma.ticket.updateMany({
      where: { estado: "CERRADO", activo: true },
      data: { activo: false },
    });

    return NextResponse.json(
      {
        success: true,
        message: `${count} ticket(s) eliminado(s).`,
        affectedRows: count,
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
