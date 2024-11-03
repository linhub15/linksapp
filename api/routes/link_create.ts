import { createRoute, z } from "@hono/zod-openapi";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../db.ts";
import { links } from "../db/schema.ts";
import type { Handler } from "../lib/types.ts";

const schema = createInsertSchema(links)
  .pick({
    href: true,
    label: true,
  })
  .openapi(
    "LinkCreate",
    {
      example: {
        href: "https://example.com",
        label: "Example",
      },
    },
  );

const route = createRoute({
  method: "post",
  path: "/links",
  description: "Creates a new link",
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
  });

  return c.text("ok");
};

export const linkCreate = { route, handler };