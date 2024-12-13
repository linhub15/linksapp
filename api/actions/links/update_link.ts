import { eq } from "drizzle-orm/expressions";
import { z } from "zod";
import { db } from "../../db/db.client.ts";
import { links, pages } from "../../db/schema.ts";

export const updateLinkRequest = z.object({
  target: z.object({
    link_id: z.string().uuid(),
    page_id: z.string().uuid(),
  }),
  values: z.object({
    href: z.string().url(),
    label: z.string(),
    newTab: z.coerce.boolean().optional().default(false),
  }),
});
export async function updateLink(request: z.infer<typeof updateLinkRequest>) {
  const { target, values } = request;
  const response = await db.transaction(async (transaction) => {
    await transaction.update(pages)
      .set({ updatedAt: new Date() })
      .where(eq(pages.id, target.page_id));

    return await transaction.update(links)
      .set({
        href: values.href,
        label: values.label,
        newTab: !!values.newTab,
      })
      .where(eq(links.id, target.link_id));
  });

  if (response.rowsAffected !== 1) {
    throw new Error("Update failed");
  }
}
