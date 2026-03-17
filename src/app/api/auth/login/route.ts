import { loginUser } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = await loginUser(body);

    if (!validation.success) {
      return NextResponse.json({ errors: validation.errors }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}
