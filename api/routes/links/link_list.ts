import { createRoute, z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";
import { links } from "../../db/schema.ts";
import type { Handler } from "../../lib/types.ts";
import { db } from "../../db/db.client.ts";

const schema = createSelectSchema(links).openapi("Link");

const route = createRoute({
  operationId: "listLinks",
  method: "get",
  path: "/links",
  responses: {
    200: {
      content: {
        "application/json": { schema: z.array(schema) },
      },
      description: "List all links",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const data = await db.select().from(links);
  return c.json(data);
};

export const linkList = { route, handler };
