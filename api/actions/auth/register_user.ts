import { createInsertSchema } from "drizzle-zod";
import type { z } from "zod";

import { db } from "../../db/db.client.ts";
import { users } from "../../db/schema.ts";

export const createUserRequest = createInsertSchema(users);

/** Idempotent; Only registers when email is not found */
export async function registerUser(request: z.infer<typeof createUserRequest>) {
  const user = await db.query.users.findFirst({
    where: ({ email }, { eq }) => eq(email, request.email),
  });

  if (user) {
    // Signin and sign up are the same operation so we do not throw an error.
    return;
  }

  await db.insert(users).values(request);
}
