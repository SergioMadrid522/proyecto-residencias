import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { signOut } from "@/app/actions";
export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("sessionCookie");
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = await jose.jwtVerify(sessionCookie.value, secret);

    await signOut();
  } catch (error) {
    console.error("El token no esta activo", error);
  }
}
