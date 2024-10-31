import { createClient } from "@libsql/client";
import "@std/dotenv/load";

export const turso = createClient({
  url: Deno.env.get("TURSO_DATABASE_URL") ?? "missing TURSO_DATABASE_URL",
  authToken: Deno.env.get("TURSO_AUTH_TOKEN"),
});

export const users = await turso.execute("SELECT * FROM users");