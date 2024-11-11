import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

import type { Handler } from "../../lib/types.ts";
import { db } from "../../db/db.client.ts";
import { links, pages } from "../../db/schema.ts";

const route = createRoute({
  operationId: "deleteLink",
  method: "delete",
  path: "/pages/{page_id}/links/{id}",
  description: "Delete a link",
  request: {
    params: z.object({ page_id: z.string().uuid(), id: z.string().uuid() }),
  },
  responses: {
    204: {
      description: "No Content",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const { id, page_id } = c.req.valid("param");

  await db.transaction(async (transaction) => {
    await transaction.delete(links).where(eq(links.id, id));
    await transaction.update(pages).set({ updatedAt: new Date() }).where(
      eq(pages.id, page_id),
    );
  });

  return c.body(null, 204);
};

export const linkDelete = { route, handler };
