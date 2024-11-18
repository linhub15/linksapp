import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../../db/db.client.ts";
import { links, pages } from "../../db/schema.ts";

export const deleteLinkRequest = z.object({
  link_id: z.string().uuid(),
  page_id: z.string().uuid(),
});

export async function deleteLink(request: z.infer<typeof deleteLinkRequest>) {
  const { link_id, page_id } = request;

  await db.transaction(async (transaction) => {
    await transaction.delete(links).where(eq(links.id, link_id));
    await transaction.update(pages).set({ updatedAt: new Date() }).where(
      eq(pages.id, page_id),
    );
  });
}
