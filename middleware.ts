import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { url, cookies } = request;

  const refreshToken = cookies.get("token")?.value;

  //Гл. стр
  const isDashboardPage = url.includes("/i");

  //Cтр авторизации
  const isAuthPage = new URL(url).pathname === "/";

  if (isAuthPage && refreshToken) {
    return NextResponse.redirect(new URL("/i", url));
  }

  if (isDashboardPage && !refreshToken) {
    return NextResponse.redirect(new URL("/", url));
  }

  return NextResponse.next();
}

// При каком условии будет срабатывать (При заходе на страницу входа и при заходе на любую другую стр)
// export const config = {
//   matcher: ["/i/:path*", "/*/:path"],
// };

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
