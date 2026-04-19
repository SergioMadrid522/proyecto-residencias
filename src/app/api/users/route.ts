import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById, getUsers } from "@/utils/getFunctions";
import { findUserById } from "@/services/user.service";

/* export async function GET() {
  try {
    const roles = await prisma.rol.findMany();
    //console.log(roles);

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
} */

export async function GET() {
  try {
    const users = await getUsers();
    if (!users?.success) {
      return NextResponse.json(
        { message: "No hay datos para mostrar." },
        { status: 404 },
      );
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error del servidor", error },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const user = await getUserById(body.id);

    await prisma.usuario.delete({ where: { id: user.id } });
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error del servidor", error },
      { status: 500 },
    );
  }
}
