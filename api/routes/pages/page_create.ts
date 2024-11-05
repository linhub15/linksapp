import { createRoute, z } from "@hono/zod-openapi";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../../db/db.client.ts";
import { pages } from "../../db/schema.ts";
import type { Handler } from "../../lib/types.ts";
import { slugify } from "./slugify.ts";

const schema = createInsertSchema(pages, {
  title: z.string().regex(/^[a-zA-Z0-9 ]+$/).openapi({
    description: "Alphnumeric characters and spaces only",
  }),
})
  .pick({
    title: true,
  })
  .openapi(
    "PageCreate",
    {
      example: {
        title: "My social media links",
      },
    },
  );

const route = createRoute({
  operationId: "createPage",
  method: "post",
  path: "/pages",
  description: "Create a page",
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

  await db.insert(pages).values({
    title: body.title,
    urlSlug: slugify(body.title),
  });

  return c.text("ok");
};

export const pageCreate = { route, handler };
