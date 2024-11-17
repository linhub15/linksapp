import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server"; // Deno 'npm:@hono/trpc-server'
import { appRouter } from "./router.ts";

const app = new Hono();

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  }),
);

export default app;
