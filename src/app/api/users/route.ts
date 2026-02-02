import { getData } from "@/app/actions";
import { userLoginValidation } from "@/utils/login.validation";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(request: Request) {
  const body = await request.json();

  try {
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const roles = await prisma.rol.findMany();

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
