import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getCookies } from "@std/http/cookie";
import { decodeJwt } from "../../lib/auth/jwt.ts";

export async function createContext(options: FetchCreateContextFnOptions) {
  const { session } = getCookies(options.req.headers);
  const payload = await decodeJwt(session);

  return {
    user: payload?.profile,
  };
}

export type Context = ReturnType<typeof createContext>;
