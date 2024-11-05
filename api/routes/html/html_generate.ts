import { createRoute, z } from "@hono/zod-openapi";
import { html } from "hono/html";
import { db } from "../../db/db.client.ts";
import type { Handler } from "../../lib/types.ts";
import { fs } from "../../fs/fs.client.ts";
import { files } from "../../db/schema.ts";

const route = createRoute({
  method: "post",
  path: "/html/generate",
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
    200: { description: "Returns content: `text/html`" },
    500: { description: "Internal Server Error" },
  },
  tags: ["html"],
});

const handler: Handler<typeof route> = async (c) => {
  const id = c.req.valid("json").pageId;

  const page = await db.query.pages.findFirst({
    where: (page, { eq }) => eq(page.id, id),
    with: { links: true },
  });

  const content = await html`<h1>${page?.title}</h1>`;

  const response = await fs.write({
    bucket: "html_pages",
    key: id,
    body: content,
  });

  if (!response.ETag) {
    return c.text("Error writing to bucket", 500);
  }
  await db.insert(files).values({
    bucket: "html_pages",
    key: id,
    etag: response.ETag,
  });

  return c.html(content);
};

export const htmlGenerate = { route, handler };
