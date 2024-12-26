import type { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { db } from "../../db/db.client.ts";
import { formSubmissions } from "../../db/schema.ts";
import { mailer } from "../../lib/smtp/mailer.ts";
import type { Json } from "../../lib/types.ts";
import { ENV } from "../../lib/env.ts";
import { html } from "../../lib/raw_html.ts";
import { siteVerify } from "../../lib/cf_turnstile/siteverify.ts";

type Result = "ok" | "disabled" | "turnstile-fail";

export const submitFormRequest = createInsertSchema(formSubmissions)
  .pick({
    ip: true,
    data: true,
    formId: true,
  });

export async function submitForm(
  request: z.infer<typeof submitFormRequest>,
  options?: { cfTurnstileToken: string },
): Promise<Result> {
  if (!options?.cfTurnstileToken) {
    return "turnstile-fail";
  }

  const form = await db.query.forms.findFirst({
    columns: {
      id: true,
      title: true,
      forwardToEmail: true,
      targetEmail: true,
      targetEmailIsVerified: true,
      cfTurnstileSecretKey: true,
    },
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

  if (!form.cfTurnstileSecretKey) {
    console.error(`Form ${form.id} has no secret key`);
    return "turnstile-fail";
  }
  const ok = await siteVerify({
    token: options?.cfTurnstileToken,
    ip: request.ip,
    secretKey: form.cfTurnstileSecretKey,
  });
  if (!ok) return "turnstile-fail";
  await db.insert(formSubmissions).values(request);

  if (form.forwardToEmail) {
    const toEmail = form.targetEmailIsVerified && form.targetEmail
      ? form.targetEmail
      : form.user.email;

    await mailer.send({
      fromAlias: "Birdy Forms",
      from: "form@birdy.dev",
      to: toEmail,
      subject: `${form.title} - New form submission`,
      text: JSON.stringify(request.data),
      html: maskToHtml(form.id, request.data),
    });
  }

  return "ok";
}

function maskToHtml(formId: string, obj: Json) {
  const entries = Object.entries(obj as Record<string, object>);
  const formUrl = `${ENV.APP_URL}/forms/${formId}`;
  return html`<div>
  <dl>
    ${
    entries.map(([key, value]) =>
      html`<dt>${key}</dt><dd>${value.toString()}</dd>`
    ).join(
      "",
    )
  }
  </dl>
  <hr />
  <p>View form submissions <a href="${formUrl}">${formUrl}</a></p>
</div>`;
}
