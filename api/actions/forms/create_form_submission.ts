import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../../db/db.client.ts";
import { formSubmissions } from "../../db/schema.ts";

export const createFormSubmissionRequest = createInsertSchema(formSubmissions)
  .pick({
    ip: true,
    data: true,
    formId: true,
  });

export async function createFormSubmission(
  request: z.infer<typeof createFormSubmissionRequest>,
) {
  await db.insert(formSubmissions).values(request);
}
