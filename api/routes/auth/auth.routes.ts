import { zValidator } from "@hono/zod-validator";
import { deleteCookie, setCookie } from "hono/cookie";
import { Hono } from "hono";
import { z } from "zod";
import {
  fetchGoogleProfile,
  googleOAuth,
} from "../../lib/auth/google_oauth.ts";
import { decodeJwt, signJwt } from "../../lib/auth/jwt.ts";
import { AUTH_COOKIE } from "../../lib/auth/options.ts";
import { registerUser } from "../../actions/auth/register_user.ts";

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
      const referrer = c.req.header("Referer");
      const { session } = c.req.valid("cookie");
      const { redirect = "" } = c.req.valid("query");
      const validAuth = await decodeJwt(session);
      const redirectUrl = new URL(redirect, referrer);

      if (validAuth) {
        return c.redirect(redirectUrl);
      }

      /** Cookie helps redirect after login */
      setCookie(
        c,
        AUTH_COOKIE.login_redirect,
        redirectUrl.toString(),
        {
          path: "/",
          httpOnly: true,
          sameSite: "Lax",
          maxAge: 30,
        },
      );

      /**
       * todo(hack): https://github.com/cmd-johnson/deno-oauth2-client/issues/59
       * allows for infering the redirectUri from the request
       */
      const { origin } = new URL(c.req.url);
      Object.assign(googleOAuth.config, {
        ...googleOAuth.config,
        redirectUri: `${origin}/auth/callback`,
      });

      const codeUri = await googleOAuth.code.getAuthorizationUri();
      setCookie(
        c,
        AUTH_COOKIE.code_verifier,
        codeUri.codeVerifier,
        {
          path: "/",
          httpOnly: true,
          sameSite: "Lax",
          maxAge: 60,
        },
      );

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

      const tokens = await googleOAuth.code.getToken(c.req.url, {
        codeVerifier: code_verifier,
      });

      const profile = await fetchGoogleProfile(tokens.accessToken);

      await registerUser({
        email: profile.email,
        emailVerified: profile.verified_email,
        family_name: profile.family_name,
        given_name: profile.given_name,
      });

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

      deleteCookie(c, AUTH_COOKIE.code_verifier);
      deleteCookie(c, AUTH_COOKIE.login_redirect);
      setCookie(c, AUTH_COOKIE.session, jwt, {
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        maxAge: 14_400, // 4 hours
        // todo(ci): enable secure in production
      });

      if (login_redirect) {
        return c.redirect(login_redirect);
      }

      return c.redirect("/auth/user");
    },
  ).get("signout", (c) => {
    deleteCookie(c, AUTH_COOKIE.session);
    return c.body("ok");
  }).get(
    "user",
    zValidator(
      "cookie",
      z.object({ [AUTH_COOKIE.session]: z.string() }),
      (result, c) => {
        if (!result.success) {
          return c.text("unauthorized", { status: 401 });
        }
      },
    ),
    async (c) => {
      const { session } = c.req.valid("cookie");
      const jwt = await decodeJwt(session);
      return c.json(jwt);
    },
  );
