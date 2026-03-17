import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("sessionCookie");
  const currentPath = request.nextUrl.pathname;
  const isLoginPage = currentPath === "/";

  if (!sessionCookie?.value) {
    if (isLoginPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jose.jwtVerify(sessionCookie!.value, secret);
    const userRole = Number(payload.userRole);

    if (isLoginPage) {
      if (userRole === 1)
        return NextResponse.redirect(new URL("/user/admin", request.url));
      if (userRole === 2)
        return NextResponse.redirect(new URL("/user/dev", request.url));
      if (userRole === 3)
        return NextResponse.redirect(new URL("/user/tester", request.url));
      return NextResponse.next();
    }

    switch (userRole) {
      case 1: // Admin
        if (!currentPath.startsWith("/user/admin")) {
          return NextResponse.redirect(new URL("/user/admin", request.url));
        }
        break;
      case 2: // Dev
        if (!currentPath.startsWith("/user/dev")) {
          return NextResponse.redirect(new URL("/user/dev", request.url));
        }
        break;
      case 3: // Tester
        if (!currentPath.startsWith("/user/tester")) {
          return NextResponse.redirect(new URL("/user/tester", request.url));
        }
        break;
      default:
        const response = NextResponse.redirect(new URL("/", request.url));
        response.cookies.delete("sessionCookie");
        return response;
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Error validando el token:", error);

    if (isLoginPage) {
      const response = NextResponse.next();
      response.cookies.delete("sessionCookie");
      return response;
    }

    // Si estaba adentro del sistema y el token expiró, lo mandamos al login
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("sessionCookie");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
