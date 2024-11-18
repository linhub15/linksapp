import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { viewHtml } from "../actions/html/view_html.ts";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc/router.ts";

export const app = new Hono();

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
  }),
);

app.get(
  "/:slug",
  zValidator("param", z.object({ slug: z.string() })),
  async (c) => {
    const { slug } = c.req.valid("param");
    const html = await viewHtml(slug);

    if (!html.ok) {
      return c.html("", 404);
    }

    return c.html(html.value);
  },
);
