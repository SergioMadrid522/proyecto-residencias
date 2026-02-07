import { loginUser } from "@/app/actions";
import { findUserByEmail } from "@/utils/findUserByEmail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;
    const validation = await loginUser(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    const userEmail = await findUserByEmail(email);
    if (!userEmail) {
      return NextResponse.json(
        { message: "Correo no registrado" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}
