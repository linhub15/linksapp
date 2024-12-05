import { z } from "zod";
import {
  createForm,
  createFormRequest,
} from "../../actions/forms/create_form.ts";
import { db } from "../../db/db.client.ts";
import { authedProcedure, router } from "./trpc.ts";
import {
  updateForm,
  updateFormRequest,
} from "../../actions/forms/update_form.ts";

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
      await createForm({ ...input, userId: ctx.user.user_id });
    }),
  update: authedProcedure
    .input(updateFormRequest)
    .mutation(async ({ input }) => {
      await updateForm(input);
    }),
});
