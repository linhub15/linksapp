import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

import { db } from "../../db/db.client.ts";
import { users } from "../../db/schema.ts";
import { mailer } from "../../lib/smtp/mailer.ts";

export const createUserRequest = createInsertSchema(users);

/** Idempotent; Only registers when email is not found */
export async function registerUser(request: z.infer<typeof createUserRequest>) {
  const appName = "LinksApp";
  const user = await db.query.users.findFirst({
    where: ({ email }, { eq }) => eq(email, request.email),
  });

  if (user) {
    // Signin and sign up are the same operation so we do not throw an error.
    return user.id;
  }

  if (!request.emailVerified) {
    throw new Error("Email is not verified");
  }

  return await db.transaction(async (transaction) => {
    const inserted = await transaction
      .insert(users)
      .values(request)
      .returning();
    const id = inserted.at(0)?.id;

    if (!id) {
      throw new Error("Failed to register user");
    }

    try {
      await mailer.send({
        to: request.email,
        subject: `Welcome to ${appName}`,
        text: `Hello, thanks for signing up for ${appName}!`,
      });
    } catch (_) {
      // todo(feat): add to an email resend queue
    }

    return id;
  });
}
