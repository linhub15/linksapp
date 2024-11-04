import { drizzle } from "drizzle-orm/libsql";
import { files, linkRelations, links, pageRelations, pages } from "./schema.ts";

export const db = drizzle({
  connection: {
    url: Deno.env.get("TURSO_DATABASE_URL") ?? "missing TURSO_DATABASE_URL",
    authToken: Deno.env.get("TURSO_AUTH_TOKEN"),
  },
  schema: { pages, pageRelations, links, linkRelations, files },
  casing: "snake_case",
});
