import { initTRPC } from "@trpc/server";
export { TRPCError } from "@trpc/server";
import superjson from "superjson";

type Context = {
  secret: string;
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const publicProcedure = t.procedure;
export const router = t.router;
