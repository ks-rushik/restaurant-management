import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import Negotiator from "negotiator";

import { updateSession } from "./app/utils/supabase/middleware";

const locales = ["en", "hd", "sp"];

function getLocale(request: NextRequest): string {
  const negotiator = new Negotiator({
    headers: {
      "accept-language": request.headers.get("accept-language") || "",
    },
  });
  const languages = negotiator.languages();
  const defaultLocale = "en";

  const matchedLocale =
    languages.find((language: string) => locales.includes(language)) ||
    defaultLocale;
  return matchedLocale;
}

export async function middleware(request: NextRequest) {
  await updateSession(request);

  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return;
  }

  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
