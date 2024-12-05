import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../../db/db.client.ts";
import { formSubmissions } from "../../db/schema.ts";

type Response = "ok" | "disabled";

export const createFormSubmissionRequest = createInsertSchema(formSubmissions)
  .pick({
    ip: true,
    data: true,
    formId: true,
  });

export async function createFormSubmission(
  request: z.infer<typeof createFormSubmissionRequest>,
): Promise<Response> {
  const form = await db.query.forms.findFirst({
    columns: { id: true },
    where: ({ id, enabled }, { and, eq }) =>
      and(eq(id, request.formId), eq(enabled, true)),
  });

  if (!form) {
    return "disabled";
  }

  await db.insert(formSubmissions).values(request);

  return "ok";
}
