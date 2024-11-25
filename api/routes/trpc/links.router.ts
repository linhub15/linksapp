import { z } from "zod";
import { authedProcedure, publicProcedure, router } from "./trpc.ts";
import { db } from "../../db/db.client.ts";
import {
  createLink,
  createLinkRequest,
} from "../../actions/links/create_link.ts";
import {
  updateLink,
  updateLinkRequest,
} from "../../actions/links/update_link.ts";
import {
  deleteLink,
  deleteLinkRequest,
} from "../../actions/links/delete_link.ts";

export const linksRouter = router({
  list: authedProcedure
    .input(z.object({ page_id: z.string().uuid() }))
    .query(async ({ input }) => {
      return await db.query.links.findMany({
        where: (link, { eq }) => eq(link.pageId, input.page_id),
      });
    }),

  create: publicProcedure
    .input(createLinkRequest)
    .mutation(async ({ input }) => {
      await createLink(input);
    }),

  update: publicProcedure
    .input(updateLinkRequest)
    .mutation(async ({ input }) => {
      await updateLink(input);
    }),

  delete: publicProcedure
    .input(deleteLinkRequest)
    .mutation(async ({ input }) => {
      await deleteLink(input);
    }),
});
