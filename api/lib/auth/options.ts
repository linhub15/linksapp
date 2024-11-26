/** Changing these values may trigger re-authentication */
import { z } from "zod";
import type { Cookie } from "@std/http/cookie";

const authEnvSchema = z.object({
  AUTH_SECRET: z.string(),
  AUTH_GOOGLE_CLIENT_ID: z.string(),
  AUTH_GOOGLE_CLIENT_SECRET: z.string(),
});

export const AUTH_ENV = authEnvSchema.parse(Deno.env.toObject());

export const AUTH_COOKIE = {
  session: "session",
  refresh: "refresh",
  code_verifier: "code_verifier",
  login_redirect: "login_redirect",
} as const;

export function codeVerifierCookie(value = ""): Cookie {
  return {
    name: AUTH_COOKIE.code_verifier,
    value,
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    maxAge: 60,
  } as const;
}

export function loginRedirectCookie(value = ""): Cookie {
  return {
    name: AUTH_COOKIE.login_redirect,
    value,
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
    maxAge: 60,
  } as const;
}

export function sessionCookie(value = ""): Cookie {
  return {
    name: AUTH_COOKIE.session,
    value: value,
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
  } as const;
}

// todo: implement refresh token
export function refreshCookie(value = ""): Cookie {
  return {
    name: AUTH_COOKIE.refresh,
    value: value,
    httpOnly: true,
    sameSite: "Lax",
    path: "/",
  };
}
