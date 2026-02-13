import { NextResponse } from "next/server";
import { registerUser } from "@/app/actions";
import { prisma } from "@/lib/prisma";
import { findUserByEmail } from "@/utils/findByFunctions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = await registerUser(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const existedEmail = await findUserByEmail(validation.data.email);
    if (existedEmail) {
      return NextResponse.json(
        { message: "El correo ya está registrado" },
        { status: 409 },
      );
    }

    await prisma.usuario.create({
      data: { ...validation.data },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}
