import { createRoute, z } from "@hono/zod-openapi";
import type { Handler } from "../../lib/types.ts";
import { db } from "../../db/db.client.ts";
import { pageSelectSchema } from "./page.types.ts";

const route = createRoute({
  operationId: "getPage",
  method: "get",
  path: "/pages/{page_id}",
  request: {
    params: z.object({ page_id: z.string().uuid() }),
  },
  responses: {
    200: {
      content: {
        "application/json": { schema: pageSelectSchema },
      },
      description: "Get a single page",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const { page_id } = c.req.valid("param");
  const data = await db.query.pages.findFirst({
    where: (page, { eq }) => eq(page.id, page_id),
  });

  return c.json(data);
};

export const pageGet = { route, handler };
