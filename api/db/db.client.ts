import { drizzle } from "drizzle-orm/libsql";
import {
  files,
  forms,
  linkRelations,
  links,
  pageRelations,
  pages,
  users,
} from "./schema.ts";

export const db = drizzle({
  connection: {
    url: Deno.env.get("TURSO_DATABASE_URL") ?? "missing TURSO_DATABASE_URL",
    authToken: Deno.env.get("TURSO_AUTH_TOKEN"),
  },
  schema: { users, pages, pageRelations, links, linkRelations, files, forms },
  casing: "snake_case",
});
