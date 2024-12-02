import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { forms } from "../../db/schema.ts";
import { db } from "../../db/db.client.ts";

export const createFormRequest = createInsertSchema(forms).pick({
  title: true,
  userId: true,
});

export async function createForm(request: z.infer<typeof createFormRequest>) {
  await db.insert(forms).values({
    ...request,
  });
}
