import { drizzle } from "drizzle-orm/libsql";
import { links, pages } from "./db/schema.ts";

export const db = drizzle({
  connection: {
    url: Deno.env.get("TURSO_DATABASE_URL") ?? "missing TURSO_DATABASE_URL",
    authToken: Deno.env.get("TURSO_AUTH_TOKEN"),
  },
  schema: { pages, links },
  casing: "snake_case",
});
