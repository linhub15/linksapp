import { trpcServer } from "@hono/trpc-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { viewHtml } from "../actions/html/view_html.ts";
import { authRoutes } from "./auth/auth.routes.ts";
import { formRoutes } from "./form.routes.ts";
import { createContext } from "./trpc/context.ts";
import { appRouter } from "./trpc/router.ts";
import { ENV } from "../lib/env.ts";

export const app = new Hono();

app
  .use("*", cors({ origin: ENV.APP_URL, credentials: true }))
  .use(
    "/trpc/*",
    trpcServer({
      router: appRouter,
      createContext: createContext,
    }),
  );

app.get(
  "/p/:slug",
  zValidator("param", z.object({ slug: z.string() })),
  async (c) => {
    const { slug } = c.req.valid("param");
    const html = await viewHtml(slug);

    if (!html.ok) {
      return c.notFound();
    }

    return c.html(html.value);
  },
);

app.route("/forms", formRoutes);
app.route("/", authRoutes);
