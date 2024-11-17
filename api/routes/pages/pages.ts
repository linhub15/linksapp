import { z } from "zod";

import { publicProcedure, router } from "../../trpc.ts";
import { db } from "../../db/db.client.ts";
import { pages } from "../../db/schema.ts";

export const pagesRouter = router({
  list: publicProcedure.query(async () => {
    return await db.select().from(pages);
  }),
  get: publicProcedure
    .input(z.object({ page_id: z.string().uuid() }))
    .query(async ({ input }) => {
      const { page_id } = input;
      return await db.query.pages.findFirst({
        where: (page, { eq }) => eq(page.id, page_id),
      });
    }),
  create: publicProcedure.mutation(() => {}),
});
