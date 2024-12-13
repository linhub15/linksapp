import { eq } from "drizzle-orm/expressions";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";
import { db } from "../../db/db.client.ts";
import { forms } from "../../db/schema.ts";

export const setEnabledRequest = createInsertSchema(forms)
  .required({ id: true })
  .pick({
    id: true,
    enabled: true,
  });

export async function setEnabled(
  request: z.infer<typeof setEnabledRequest>,
) {
  await db.update(forms)
    .set({ enabled: request.enabled })
    .where(eq(forms.id, request.id));
}
