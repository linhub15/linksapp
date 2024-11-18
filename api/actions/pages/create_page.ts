import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../../db/db.client.ts";
import { slugify } from "../../lib/slugify.ts";
import { pages } from "../../db/schema.ts";

export const createPageRequest = createInsertSchema(pages, {
  title: z.string().regex(/^[a-zA-Z0-9 ]+$/),
}).pick({ title: true });

export async function createPage(request: z.infer<typeof createPageRequest>) {
  return await db.insert(pages).values({
    title: request.title,
    urlSlug: slugify(request.title),
  });
}
