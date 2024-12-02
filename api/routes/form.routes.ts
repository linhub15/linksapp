import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { getConnInfo } from "hono/deno";
import { z } from "zod";
import { createFormSubmission } from "../actions/forms/create_form_submission.ts";

export const formRoutes = new Hono();

formRoutes
  .post(
    "/:formId",
    zValidator(
      "param",
      z.object({
        formId: z.string().uuid(),
      }),
    ),
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

      try {
        await createFormSubmission({ ip: ip, data: data, formId: formId });
      } catch (e) {
        if (e instanceof Error) {
          console.error({ ip: ip, error: e.message });
        }
        return ctx.text("500 error", 500);
      }

      // todo(feat): add a success page or redirect somewhere after form submission

      return ctx.text("ok");
    },
  );
