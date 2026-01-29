import { getData } from "@/app/actions";
import { userLoginValidation } from "@/utils/login.validation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const errors = userLoginValidation(body);
  const { email, password } = body;

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }
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
  const data = await getData();

  if (!data) {
    return NextResponse.json(
      { message: "No hay datos para mostrar." },
      { status: 400 },
    );
  }

  return NextResponse.json({ data }, { status: 200 });
}
