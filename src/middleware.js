import { NextResponse } from "next/server";

export function middleware(request) {
  const loggedInUser = request.cookies.get("token")?.value;
  console.log("middleware");

  if (!loggedInUser && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard"],
};
