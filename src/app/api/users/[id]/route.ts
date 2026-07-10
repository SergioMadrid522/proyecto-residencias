import { getUserById, getUserSession } from "@/utils/getFunctions";
import { NextResponse } from "next/server";
import { validatePassword } from "@/services/validatePassword.service";
import { prisma } from "@/lib/prisma";
import * as bycript from "bcrypt";
import { hashPassword } from "@/utils/hashPassword";
import { findUserById } from "@/services/user.service";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const data = await getUserById(Number(id));
    const { user } = data;

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await request.json();

    const { id } = await params;
    const userId = Number(id);
    const validation = await findUserById(userId);

    if (!validation) {
      return NextResponse.json(
        { error: "Ningún usuario encontrado" },
        { status: 400 },
      );
    }
    const passwordMatch = await bycript.compare(
      body.actualPassword,
      validation.password,
    );

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "La contraseña actual no coincide" },
        { status: 400 },
      );
    }
    const isSamePassword = await bycript.compare(
      body.newPassword,
      validation.password,
    );

    if (isSamePassword) {
      return NextResponse.json(
        { error: "La contraseña nueva no puede ser igual a la anterior" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(body.newPassword);

    await prisma.usuario.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
