import { createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../../db/db.client.ts";
import { links, pages } from "../../db/schema.ts";
import type { Handler } from "../../lib/types.ts";

const schema = createInsertSchema(links, {
  href: z.string().url(),
  newTab: z.coerce.boolean().optional(),
})
  .pick({
    href: true,
    label: true,
    newTab: true,
  })
  .openapi(
    "LinkCreate",
    {
      example: {
        href: "https://example.com",
        label: "Example",
        newTab: false,
      },
    },
  );

const route = createRoute({
  method: "post",
  path: "/pages/:pageId/links",
  description: "Create a new link",
  request: {
    params: z.object({ pageId: z.string().uuid() }),
    body: {
      content: {
        "application/json": { schema },
      },
    },
  },
  responses: {
    200: {
      content: {
        "text/plain": { schema: z.string() },
      },
      description: "ok",
    },
  },
});

const handler: Handler<typeof route> = async (c) => {
  const pageId = c.req.valid("param").pageId;
  const body = c.req.valid("json");

  await db.transaction(async (transaction) => {
    await transaction.insert(links).values({
      href: body.href,
      label: body.label,
      newTab: body.newTab,
      pageId: pageId,
    });

    await transaction.update(pages).set({ updatedAt: new Date() }).where(
      eq(pages.id, pageId),
    );
  });

  return c.text("ok");
};

export const linkCreate = { route, handler };
