import { eq } from "drizzle-orm/expressions";
import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";
import { forms } from "../../db/schema.ts";
import { db } from "../../db/db.client.ts";

export const updateFormRequest = createInsertSchema(forms)
  .required({ id: true })
  .pick({
    id: true,
    title: true,
  });

export async function updateForm(request: z.infer<typeof updateFormRequest>) {
  await db.update(forms)
    .set({ title: request.title })
    .where(eq(forms.id, request.id));
}
