import { drizzle } from "drizzle-orm/libsql";
import { users } from "./db/schema.ts";

export const db = drizzle({
  connection: {
    url: Deno.env.get("TURSO_DATABASE_URL") ?? "missing TURSO_DATABASE_URL",
    authToken: Deno.env.get("TURSO_AUTH_TOKEN"),
  },
  casing: "snake_case",
});

export const result = await db.select().from(users);
