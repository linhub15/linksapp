import { createInsertSchema } from "drizzle-zod";
import { forms } from "../../db/schema.ts";
import { db } from "../../db/db.client.ts";
import type z from "zod";
import { eq } from "drizzle-orm";

export const setCloudflareTurnstileRequest = createInsertSchema(forms)
  .required({ id: true })
  .pick({
    id: true,
    cfTurnstileSiteKey: true,
    cfTurnstileSecretKey: true,
  });

export async function setCloudflareTurnstile(
  request: z.infer<typeof setCloudflareTurnstileRequest>,
) {
  await db.update(forms)
    .set({
      cfTurnstileSiteKey: request.cfTurnstileSiteKey,
      cfTurnstileSecretKey: request.cfTurnstileSecretKey,
    })
    .where(eq(forms.id, request.id));
}
