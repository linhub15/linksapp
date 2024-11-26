/** Changing these values may trigger re-authentication */
import { z } from "zod";

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
