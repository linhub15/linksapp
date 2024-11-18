import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";
import type { z } from "zod";
import { links, pages } from "../../db/schema.ts";
import { db } from "../../db/db.client.ts";

export const createLinkRequest = createInsertSchema(links);

export async function createLink(request: z.infer<typeof createLinkRequest>) {
  await db.transaction(async (transaction) => {
    await transaction.insert(links).values({
      href: request.href,
      label: request.label,
      newTab: request.newTab,
      pageId: request.pageId,
    });

    await transaction.update(pages)
      .set({ updatedAt: new Date() })
      .where(eq(pages.id, request.pageId));
  });
}
