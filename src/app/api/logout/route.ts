import { signOut } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await signOut();
    return NextResponse.json(
      { message: "Se ha cerrado la sesión con éxito." },
      { status: 200 },
    );
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "Server Interal Error" },
      { status: 500 },
    );
  }
}
