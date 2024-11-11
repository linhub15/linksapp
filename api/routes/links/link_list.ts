import { createRoute, z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";
import { links } from "../../db/schema.ts";
import type { Handler } from "../../lib/types.ts";
import { db } from "../../db/db.client.ts";

const schema = createSelectSchema(links).openapi("Link");

const route = createRoute({
  operationId: "listLinks",
  method: "get",
  path: "/pages/{page_id}/links",
  request: {
    params: z.object({ page_id: z.string().uuid() }),
  },
  responses: {
    200: {
      content: {
        "application/json": { schema: z.array(schema) },
      },
      description: "List links for a page",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const { page_id } = c.req.valid("param");
  const data = await db.query.links.findMany({
    where: (link, { eq }) => eq(link.pageId, page_id),
  });

  return c.json(data);
};

export const linkList = { route, handler };
