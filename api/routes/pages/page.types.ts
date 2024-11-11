import { z } from "@hono/zod-openapi";
import { createSelectSchema } from "drizzle-zod";
import { pages } from "../../db/schema.ts";

export const pageSelectSchema = createSelectSchema(pages).extend({
  updatedAt: z.string().nullable().openapi({ format: "date-time" }),
  createdAt: z.string().nullable().openapi({ format: "date-time" }),
  publishedAt: z.string().nullable().openapi({ format: "date-time" }),
}).openapi("Page");