import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { signOut } from "@/app/actions";

export async function proxy(request: NextRequest) {
  /* const sessionCookie = request.cookies.get("sessionCookie");
  if (!sessionCookie?.value) {
    return NextResponse.json({ message: "" }, { status: 404 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = await jose.jwtVerify(sessionCookie!.value, secret);

    const { userRole } = payload.payload;
    console.log(payload.payload);

    /* if (!userRole) {
      console.log("serás redirigido a la pagina de inicio de sesion:");
    }
    switch (Number(userRole)) {
      case 1:
        //NextResponse.redirect(new URL("/admin", request.url));
        console.log(
          "serás redirigido a la pagina admin por que tu usuario es tipo:",
          userRole,
        );
        break;
      case 2:
        //NextResponse.redirect(new URL("/dev", request.url));
        console.log(
          "serás redirigido a la pagina desarrollador por que tu usuario es tipo:",
          userRole,
        );
        break;
      case 3:
        //NextResponse.redirect(new URL("/tester", request.url));
        console.log(
          "serás redirigido a la pagina tester por que tu usuario es tipo:",
          userRole,
        );
        break;
      default:
        //NextResponse.redirect(new URL("/api/login", request.url));
        console.log("serás redirigido a la pagina de inicio de sesion:");
        break;
    } 
  } catch (error) {
    console.error(error);
  } */
}
