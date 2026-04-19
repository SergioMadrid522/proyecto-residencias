"use server";
import { cookies } from "next/headers";
import * as jose from "jose";

export default async function getSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sessionCookie")?.value;

    if (!token) return null;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);

    return {
      userId: Number(payload.userId),
      userRole: Number(payload.userRole),
    };
  } catch (error) {
    console.log("El token no es valido o expiro");
    return null;
  }
}
