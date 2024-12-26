import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getConnInfo } from "hono/deno";
import { z } from "zod";
import { submitForm } from "../actions/forms/submit_form.ts";

export const formRoutes = new Hono();

formRoutes
  .post(
    "/:formId",
    zValidator(
      "header",
      z.object({
        referer: z.string().url(),
        "CF-Connecting-IP": z.string().ip().optional(),
      }),
    ),
    zValidator(
      "param",
      z.object({
        formId: z.string().uuid(),
      }),
    ),
    zValidator("query", z.object({ return_to: z.string().optional() })),
    zValidator(
      "form",
      z.record(z.string(), z.any()),
    ),
    async (ctx) => {
      const ip = getConnInfo(ctx).remote.address;
      if (!ip) {
        return ctx.notFound();
      }

      const { formId } = ctx.req.valid("param");
      const data = ctx.req.valid("form");
      const cfTurnstileToken = data["cf-turnstile-response"];
      data["cf-turnstile-response"] = undefined;

      if (!cfTurnstileToken) {
        console.warn("Missing cf-turnstile-response");
        return ctx.text("403 Forbidden", 403);
      }

      try {
        const result = await submitForm({
          ip: ip,
          data: data,
          formId: formId,
        }, { cfTurnstileToken: cfTurnstileToken });

        if (result !== "ok") {
          console.error({ ip: ip, result: result });
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error({ ip: ip, error: e.message });
        }
        return ctx.text("500 error", 500);
      }

      // default redirect to referer
      // optional: redirect to a custom success page
      const { referer } = ctx.req.valid("header");
      const { return_to } = ctx.req.valid("query");
      return ctx.redirect(new URL(return_to ?? "", referer));
    },
  );
