import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const roles = await prisma.rol.findMany();
    console.log(roles);

    if (roles.length === 0) {
      return NextResponse.json(
        { message: "No hay datos para mostrar." },
        { status: 404 },
      );
    }

    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error del servidor", error },
      { status: 500 },
    );
  }
}
