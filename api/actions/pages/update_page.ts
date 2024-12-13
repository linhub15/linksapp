import { eq } from "drizzle-orm/expressions";
import { z } from "zod";
import { db } from "../../db/db.client.ts";
import { pages } from "../../db/schema.ts";
import { slugify } from "../../lib/slugify.ts";

export const updatePageRequest = z.object({
  id: z.string().uuid(),
  title: z.string(),
});

export async function updatePage(request: z.infer<typeof updatePageRequest>) {
  const response = await db
    .update(pages)
    .set({
      title: request.title,
      urlSlug: slugify(request.title),
    })
    .where(eq(pages.id, request.id));

  if (response.rowsAffected === 1) {
    return "ok";
  }

  throw new Error("page: update failed");
}
