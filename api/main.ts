/** EFFECT: load .env into process */
import "@std/dotenv/load";

/** Mount the routes */
import { trpcServer } from "@hono/trpc-server";
import { app } from "./routes/hono.ts";
import { appRouter } from "./routes/router.ts";

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  }),
);

Deno.serve(app.fetch);
