import { eq } from "drizzle-orm/expressions";
import { z } from "zod";
import {
  createForm,
  createFormRequest,
} from "../../actions/forms/create_form.ts";
import {
  setEnabled,
  setEnabledRequest,
} from "../../actions/forms/set_enabled.ts";
import {
  setTargetEmail,
  setTargetEmailRequest,
} from "../../actions/forms/set_target_email.ts";
import {
  updateForm,
  updateFormRequest,
} from "../../actions/forms/update_form.ts";
import { db } from "../../db/db.client.ts";
import { forms } from "../../db/schema.ts";
import { authedProcedure, router } from "./trpc.ts";
import {
  setCloudflareTurnstile,
  setCloudflareTurnstileRequest,
} from "../../actions/forms/set_cloudflare_turnstile.ts";

export const formsRouter = router({
  list: authedProcedure.query(
    async (options) => {
      const { user } = options.ctx;

      return await db.query.forms.findMany({
        where: (form, { eq }) => eq(form.userId, user.user_id),
      });
    },
  ),
  get: authedProcedure
    .input(z.object({ form_id: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      return await db.query.forms.findFirst({
        with: {
          submissions: {
            orderBy: ({ createdAt }, { desc }) => [desc(createdAt)],
          },
        },
        where: (form, { eq, and }) =>
          and(eq(form.id, input.form_id), eq(form.userId, ctx.user.user_id)),
      });
    }),
  create: authedProcedure
    .input(createFormRequest.pick({ title: true }))
    .mutation(async ({ input, ctx }) => {
      return await createForm({ ...input, userId: ctx.user.user_id });
    }),
  delete: authedProcedure
    .input(z.object({ form_id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      await db.delete(forms).where(eq(forms.id, input.form_id));
    }),
  update: authedProcedure
    .input(updateFormRequest)
    .mutation(async ({ input }) => {
      await updateForm(input);
    }),
  setEnabled: authedProcedure
    .input(setEnabledRequest)
    .mutation(async ({ input }) => {
      await setEnabled(input);
    }),
  setTargetEmail: authedProcedure
    .input(setTargetEmailRequest)
    .mutation(async ({ input }) => {
      await setTargetEmail(input);
    }),
  setCloudflareTurnstile: authedProcedure
    .input(setCloudflareTurnstileRequest)
    .mutation(async ({ input }) => {
      await setCloudflareTurnstile(input);
    }),
});
