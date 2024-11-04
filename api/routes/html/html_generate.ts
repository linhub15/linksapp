import { createRoute, z } from "@hono/zod-openapi";
import { html } from "hono/html";
import { db } from "../../db/db.client.ts";
import type { Handler } from "../../lib/types.ts";

const route = createRoute({
  method: "post",
  path: "/generate/html",
  description: "Generate static HTML for a specific page",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({ pageId: z.string().uuid() }).required(),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Returns content: `text/html`",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const id = c.req.valid("json").pageId;

  const page = await db.query.pages.findFirst({
    where: (page, { eq }) => eq(page.id, id),
    with: { links: true },
  });

  // todo: persist the html into a bucket and persist the path to the db;
  const content = await html`<h1>${page?.title}</h1>`;

  return c.html(content);
};

export const htmlGenerate = { route, handler };
