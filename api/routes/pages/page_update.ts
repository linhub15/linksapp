import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

import { createInsertSchema } from "drizzle-zod";
import { pages } from "../../db/schema.ts";
import type { Handler } from "../../lib/types.ts";
import { db } from "../../db/db.client.ts";
import { slugify } from "./slugify.ts";

const schema = createInsertSchema(pages)
  .pick({
    title: true,
  })
  .openapi(
    "PageUpdate",
    {
      example: {
        title: "https://example.com",
      },
    },
  );

const route = createRoute({
  operationId: "updatePage",
  method: "put",
  path: "/pages/{id}",
  description: "Update a page",
  request: {
    params: z.object({ id: z.string().uuid() }),
    body: {
      content: {
        "application/json": { schema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "text/plain": { schema: z.literal("ok") },
      },
      description: "ok",
    },
    400: {
      description: "Update failed",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const id = c.req.valid("param").id;
  const body = c.req.valid("json");

  const response = await db
    .update(pages)
    .set({
      title: body.title,
      urlSlug: slugify(body.title),
    })
    .where(eq(pages.id, id));

  if (response.rowsAffected === 1) {
    return c.text("ok");
  }

  return c.text("Update failed", 400);
};

export const pageUpdate = { route, handler };
