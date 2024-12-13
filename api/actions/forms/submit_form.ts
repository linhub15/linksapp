import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../../db/db.client.ts";
import { formSubmissions } from "../../db/schema.ts";
import { mailer } from "../../lib/smtp/mailer.ts";

type Response = "ok" | "disabled";

export const submitFormRequest = createInsertSchema(formSubmissions)
  .pick({
    ip: true,
    data: true,
    formId: true,
  });

export async function submitForm(
  request: z.infer<typeof submitFormRequest>,
): Promise<Response> {
  const form = await db.query.forms.findFirst({
    columns: { id: true, targetEmail: true, targetEmailIsVerified: true },
    where: ({ id, enabled }, { and, eq }) =>
      and(eq(id, request.formId), eq(enabled, true)),
    with: {
      user: {
        columns: { email: true },
      },
    },
  });

  if (!form) {
    return "disabled";
  }

  await db.insert(formSubmissions).values(request);

  // todo(feat): configure their own SMTP server
  const toEmail = form.targetEmailIsVerified && form.targetEmail
    ? form.targetEmail
    : form.user.email;

  // todo(feat): show formatted HTML email of the submission
  await mailer.send({
    to: toEmail,
    subject: "Form submission",
    text: JSON.stringify(request.data),
  });

  return "ok";
}
