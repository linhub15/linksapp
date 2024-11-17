import { initTRPC } from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

export const appRouter = router({
  hello: publicProcedure
    .input(z.string().nullish())
    .query(({ input }) => {
      return {
        message: `Hello! ${input ?? "World"}`,
        date: new Date(),
      };
    }),
  thing: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(() => {
      return {
        success: true,
      };
    }),
});

export type AppRouter = typeof appRouter;
