import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";
import type { z } from "zod";
import { forms } from "../../db/schema.ts";
import { db } from "../../db/db.client.ts";

export const updateFormRequest = createInsertSchema(forms)
  .required({
    id: true,
  })
  .partial({
    title: true,
  })
  .pick({
    id: true,
    enabled: true,
    title: true,
  });

export async function updateForm(request: z.infer<typeof updateFormRequest>) {
  await db.update(forms)
    .set({
      enabled: request.enabled,
      title: request.title,
    })
    .where(eq(forms.id, request.id));
}
