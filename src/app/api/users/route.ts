import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserById, getUsers } from "@/utils/getFunctions";
import { findUserById } from "@/services/user.service";
import { hashPassword } from "@/utils/hashPassword";
import { updateUserData } from "@/services/update.service";

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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, rol, dataToUpdate, hashedPassword } =
      await updateUserData(body);

    await prisma.usuario.update({
      where: { id },
      data: {
        ...dataToUpdate,
        ...(hashedPassword && { password: hashedPassword }),
        rol: {
          connect: { id: rol },
        },
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        password: true,
        rol: true,
      },
    });

    return NextResponse.json(
      { message: "Usuario actualizado" },
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
