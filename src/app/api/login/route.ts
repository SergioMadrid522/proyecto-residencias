import { userLoginValidation } from "@/utils/login.validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

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
