import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";

import { createInsertSchema } from "drizzle-zod";
import { links, pages } from "../../db/schema.ts";
import type { Handler } from "../../lib/types.ts";
import { db } from "../../db/db.client.ts";

const schema = createInsertSchema(links, {
  href: z.string().url(),
  newTab: z.coerce.boolean().optional().default(false),
})
  .pick({
    href: true,
    label: true,
    newTab: true,
  })
  .openapi(
    "LinkUpdate",
    {
      example: {
        href: "https://example.com",
        label: "Example",
        newTab: false,
      },
    },
  );

const route = createRoute({
  operationId: "updateLink",
  method: "put",
  path: "/pages/{pageId}/links/{id}",
  description: "Update a link",
  request: {
    params: z.object({ pageId: z.string().uuid(), id: z.string().uuid() }),
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
  const { pageId, id } = c.req.valid("param");
  const body = c.req.valid("json");

  const response = await db.transaction(async (transaction) => {
    await transaction.update(pages).set({ updatedAt: new Date() }).where(
      eq(pages.id, pageId),
    );
    return await transaction.update(links)
      .set({
        href: body.href,
        label: body.label,
        newTab: !!body.newTab,
      })
      .where(eq(links.id, id));
  });

  if (response.rowsAffected === 1) {
    return c.text("ok");
  }

  return c.text("Update failed", 400);
};

export const linkUpdate = { route, handler };
