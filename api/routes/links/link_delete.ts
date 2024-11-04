import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

import type { Handler } from "../../lib/types.ts";
import { db } from "../../db.ts";
import { links } from "../../db/schema.ts";

const route = createRoute({
  method: "delete",
  path: "/links/:id",
  description: "Delete a link",
  request: {
    params: z.object({ id: z.string().uuid() }),
  },
  responses: {
    204: {
      description: "No Content",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const id = c.req.valid("param").id;

  await db.delete(links).where(eq(links.id, id));

  return c.body(null, 204);
};

export const linkDelete = { route, handler };
