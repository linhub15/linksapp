import { createRoute, z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";
import { pages } from "../../db/schema.ts";
import type { Handler } from "../../lib/types.ts";
import { db } from "../../db/db.client.ts";

const schema = createSelectSchema(pages).openapi("Page");

const route = createRoute({
  method: "get",
  path: "/pages",
  responses: {
    200: {
      content: {
        "application/json": { schema: z.array(schema) },
      },
      description: "List all pages",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const data = await db.select().from(pages);
  return c.json(data);
};

export const pageList = { route, handler };
