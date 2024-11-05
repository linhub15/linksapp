import { createRoute, z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";
import { pages } from "../../db/schema.ts";
import type { Handler } from "../../lib/types.ts";
import { db } from "../../db/db.client.ts";

const schema = createSelectSchema(pages).openapi("Page");

const route = createRoute({
  operationId: "getPage",
  method: "get",
  path: "/pages/{id}",
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    200: {
      content: {
        "application/json": { schema: schema },
      },
      description: "Get a single page",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const id = c.req.valid("param").id;

  const data = await db.query.pages.findFirst({
    where: (page, { eq }) => eq(page.id, id),
  });

  return c.json(data);
};

export const pageGet = { route, handler };
