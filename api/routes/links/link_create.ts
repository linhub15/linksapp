import { createRoute, z } from "@hono/zod-openapi";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../../db.ts";
import { links } from "../../db/schema.ts";
import type { Handler } from "../../lib/types.ts";

const schema = createInsertSchema(links, {
  href: z.string().url(),
  newTab: z.coerce.boolean().optional(),
})
  .pick({
    href: true,
    label: true,
    newTab: true,
    pageId: true,
  })
  .openapi(
    "LinkCreate",
    {
      example: {
        href: "https://example.com",
        label: "Example",
        newTab: false,
        pageId: "caa94a8b-6f68-4984-94ba-c52b30f77ae0",
      },
    },
  );

const route = createRoute({
  method: "post",
  path: "/links",
  description: "Create a new link",
  request: {
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
  const body = c.req.valid("json");

  await db.insert(links).values({
    href: body.href,
    label: body.label,
    newTab: body.newTab,
    pageId: body.pageId,
  });

  return c.text("ok");
};

export const linkCreate = { route, handler };
