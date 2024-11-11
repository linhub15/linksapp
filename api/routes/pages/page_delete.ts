import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

import type { Handler } from "../../lib/types.ts";
import { db } from "../../db/db.client.ts";
import { pages } from "../../db/schema.ts";

const route = createRoute({
  operationId: "deletePage",
  method: "delete",
  path: "/pages/{page_id}",
  request: {
    params: z.object({ page_id: z.string().uuid() }),
  },
  responses: {
    204: {
      description: "No Content",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const { page_id } = c.req.valid("param");

  await db.delete(pages).where(eq(pages.id, page_id));

  return c.body(null, 204);
};

export const pageDelete = { route, handler };