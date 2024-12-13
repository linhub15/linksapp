import { createInsertSchema } from "drizzle-zod";
import { eq } from "drizzle-orm";
import type { z } from "zod";
import { forms } from "../../db/schema.ts";
import { db } from "../../db/db.client.ts";

export const setTargetEmailRequest = createInsertSchema(forms)
  .required({ id: true })
  .pick({
    id: true,
    targetEmail: true,
  });

export async function setTargetEmail(
  request: z.infer<typeof setTargetEmailRequest>,
) {
  const form = await db.query.forms.findFirst({
    where: (form, { eq }) => eq(form.id, request.id),
    with: {
      user: {
        columns: {
          email: true,
        },
      },
    },
  });

  const prevEmail = form?.targetEmail;

  if (prevEmail === request.targetEmail) {
    return;
  }

  await db.update(forms)
    .set({
      targetEmail: request.targetEmail,
      targetEmailIsVerified: request.targetEmail ? false : null,
    })
    .where(eq(forms.id, request.id));
}
