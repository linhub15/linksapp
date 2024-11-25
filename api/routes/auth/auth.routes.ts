import { zValidator } from "@hono/zod-validator";
import { deleteCookie, setCookie } from "@std/http/cookie";
import { Hono } from "hono";
import { z } from "zod";
import {
  fetchGoogleProfile,
  googleOAuth,
} from "../../lib/auth/google_oauth.ts";
import { decodeJwt, signJwt } from "../../lib/auth/jwt.ts";
import {
  AUTH_COOKIE,
  codeVerifierCookie,
  loginRedirectCookie,
  sessionCookie,
} from "../../lib/auth/options.ts";

export const authRoutes = new Hono().basePath("/auth");

authRoutes
  .get(
    "signin",
    zValidator(
      "cookie",
      z.object({ [AUTH_COOKIE.session]: z.string().optional() }),
    ),
    zValidator("query", z.object({ redirect: z.string().optional() })),
    async (c) => {
      const { session } = c.req.valid("cookie");
      const payload = await decodeJwt(session);

      if (payload) {
        return c.redirect("/auth/profile");
      }

      const { redirect } = c.req.valid("query");

      // todo(hack): https://github.com/cmd-johnson/deno-oauth2-client/issues/59
      // allows for infering the redirectUri from the request
      const { origin } = new URL(c.req.url);
      Object.assign(googleOAuth.config, {
        ...googleOAuth.config,
        redirectUri: `${origin}/auth/callback`,
      });

      const codeUri = await googleOAuth.code.getAuthorizationUri();

      setCookie(c.res.headers, codeVerifierCookie(codeUri.codeVerifier));
      setCookie(c.res.headers, loginRedirectCookie(redirect));

      return c.redirect(codeUri.uri);
    },
  ).get(
    "callback",
    zValidator(
      "cookie",
      z.object({
        [AUTH_COOKIE.code_verifier]: z.string(),
        [AUTH_COOKIE.login_redirect]: z.string(),
      }),
    ),
    async (c) => {
      const { code_verifier, login_redirect } = c.req.valid("cookie");
      deleteCookie(c.res.headers, AUTH_COOKIE.code_verifier);
      deleteCookie(c.res.headers, AUTH_COOKIE.login_redirect);

      const tokens = await googleOAuth.code.getToken(c.req.url, {
        codeVerifier: code_verifier,
      });

      const profile = await fetchGoogleProfile(tokens.accessToken);

      // todo: get or register profile

      const jwt = await signJwt({
        profile: {
          email: profile.email,
          email_verified: profile.verified_email,
          family_name: profile.family_name,
          given_name: profile.given_name,
          name: profile.name,
          picture: profile.picture,
          sub: profile.id,
          user_id: profile.id,
        },
      });

      setCookie(c.res.headers, sessionCookie(jwt));

      if (login_redirect) {
        return c.redirect(login_redirect);
      }

      return c.redirect("/auth/profile");
    },
  ).get("signout", (c) => {
    deleteCookie(c.res.headers, AUTH_COOKIE.session, { ...sessionCookie() });
    return c.body("ok");
  }).get(
    "profile",
    zValidator("cookie", z.object({ [AUTH_COOKIE.session]: z.string() })),
    async (c) => {
      const { session } = c.req.valid("cookie");
      const jwt = await decodeJwt(session);
      return c.json(jwt);
    },
  );
