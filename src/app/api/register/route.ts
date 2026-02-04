import { FindUserByEmail, RegisterUser } from "@/app/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    const validation = await RegisterUser(body);
    const existedEmail = await FindUserByEmail(body);

    if (!validation?.success) {
      return NextResponse.json({ errors: validation?.errors }, { status: 400 });
    }

    if (email === existedEmail) {
      return NextResponse.json(
        { message: "El correo ya está registrado" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { messsage: "Usuario creado con éxito" },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}
