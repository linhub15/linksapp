import { z } from "zod";
import { publicProcedure, router } from "../trpc.ts";
import { db } from "../db/db.client.ts";

export const linksRouter = router({
  list: publicProcedure
    .input(z.object({ page_id: z.string().uuid() }))
    .query(async ({ input }) => {
      return await db.query.links.findMany({
        where: (link, { eq }) => eq(link.pageId, input.page_id),
      });
    }),
});
