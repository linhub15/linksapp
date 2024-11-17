/** EFFECT: load .env into process */
import "@std/dotenv/load";

/** EFFECT: add .openapi() function to zod */
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

/** Mount the routes */
import { app } from "./routes/app.ts";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./routes/router.ts";

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  }),
);


Deno.serve(app.fetch);
