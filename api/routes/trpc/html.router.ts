import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { generateHtml } from "../../actions/html/generate_html.ts";
import { publicProcedure, router } from "./trpc.ts";

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
