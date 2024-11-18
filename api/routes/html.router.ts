import { z } from "zod";
import { publicProcedure, router, TRPCError } from "../trpc.ts";
import { generateHtml } from "../actions/html/generate_html.ts";

export const htmlRouter = router({
  generate: publicProcedure
    .input(z.object({ page_id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const result = await generateHtml(input.page_id);

      if (!result.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: result.error.message,
        });
      }

      return result.value;
    }),
});
