import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createPage,
  createPageRequest,
} from "../../actions/pages/create_page.ts";
import {
  updatePage,
  updatePageRequest,
} from "../../actions/pages/update_page.ts";
import { db } from "../../db/db.client.ts";
import { pages } from "../../db/schema.ts";
import { authedProcedure, router } from "./trpc.ts";

export const pagesRouter = router({
  list: authedProcedure.query(async () => {
    return await db.select().from(pages);
  }),
  get: authedProcedure
    .input(z.object({ page_id: z.string().uuid() }))
    .query(async ({ input }) => {
      const { page_id } = input;
      return await db.query.pages.findFirst({
        where: (page, { eq }) => eq(page.id, page_id),
      });
    }),
  create: authedProcedure
    .input(createPageRequest)
    .mutation(async ({ input }) => {
      await createPage(input);
    }),
  update: authedProcedure
    .input(updatePageRequest)
    .mutation(async ({ input }) => {
      await updatePage(input);
    }),
  delete: authedProcedure
    .input(z.object({ page_id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const { page_id } = input;
      await db.delete(pages).where(eq(pages.id, page_id));
    }),
});
