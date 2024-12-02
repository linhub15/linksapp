import {
  createForm,
  createFormRequest,
} from "../../actions/forms/create_form.ts";
import { db } from "../../db/db.client.ts";
import { authedProcedure, router } from "./trpc.ts";

export const formsRouter = router({
  list: authedProcedure.query(
    async (options) => {
      const { user } = options.ctx;

      return await db.query.forms.findMany({
        where: (form, { eq }) => eq(form.userId, user.user_id),
      });
    },
  ),
  create: authedProcedure
    .input(createFormRequest.pick({ title: true }))
    .mutation(async ({ input, ctx }) => {
      await createForm({ ...input, userId: ctx.user.user_id });
    }),
});
