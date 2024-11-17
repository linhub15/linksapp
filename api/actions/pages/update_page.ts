import { z } from "zod";
import { eq } from "drizzle-orm";
import { pages } from "../../db/schema.ts";
import { db } from "../../db/db.client.ts";
import { slugify } from "../../routes/pages/slugify.ts";

export const pageUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
});

export async function updatePage(page: z.infer<typeof pageUpdateSchema>) {
  const response = await db
    .update(pages)
    .set({
      title: page.title,
      urlSlug: slugify(page.title),
    })
    .where(eq(pages.id, page.id));

  if (response.rowsAffected === 1) {
    return "ok";
  }

  throw new Error("page: update failed");
}
