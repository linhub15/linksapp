import { eq } from "drizzle-orm/expressions";
import z from "zod";
import { db } from "../../db/db.client.ts";
import { forms } from "../../db/schema.ts";

const verifyTargetEmailRequest = z.object({
  id: z.string().uuid(),
});

// todo(feat): how to create a verification URL for this target email?
export async function verifyTargetEmail(
  request: z.infer<typeof verifyTargetEmailRequest>,
) {
  await db.update(forms)
    .set({ targetEmailIsVerified: true })
    .where(eq(forms.id, request.id));
}
