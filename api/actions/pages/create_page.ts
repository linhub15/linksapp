import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../../db/db.client.ts";
import { slugify } from "../../routes/pages/slugify.ts";
import { pages } from "../../db/schema.ts";

export const pageCreateSchema = createInsertSchema(pages, {
  title: z.string().regex(/^[a-zA-Z0-9 ]+$/),
}).pick({ title: true });

export async function createPage(page: z.infer<typeof pageCreateSchema>) {
  return await db.insert(pages).values({
    title: page.title,
    urlSlug: slugify(page.title),
  });
}
