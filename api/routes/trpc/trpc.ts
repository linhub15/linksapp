import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { Context } from "./context.ts";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure.use((opts) => {
  const { ctx } = opts;

  if (!ctx.user?.user_id) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: { user: ctx.user },
  });
});
export const router = t.router;
