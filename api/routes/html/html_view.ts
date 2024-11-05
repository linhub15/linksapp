import { createRoute, z } from "@hono/zod-openapi";
import type { Handler } from "../../lib/types.ts";
import { fs } from "../../fs/fs.client.ts";

const route = createRoute({
  method: "get",
  path: "/:slug",
  description: "View a published link page",
  request: {
    params: z.object({ slug: z.string() }),
  },
  responses: {
    200: { description: "ok" },
    404: { description: "Not Found" },
  },
  tags: ["html"],
});

const handler: Handler<typeof route> = async (c) => {
  const slug = c.req.valid("param").slug;

  const html = await fs.read({
    bucket: "html_pages",
    key: slug,
  });

  if (!html.ok) {
    return c.text("Page not found", 404);
  }

  return c.html(html.value);
};

export const htmlView = { route, handler };
