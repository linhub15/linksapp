import { drizzle } from "drizzle-orm/libsql";
import {
  files,
  formRelations,
  forms,
  formSubmissionRelations,
  formSubmissions,
  linkRelations,
  links,
  pageRelations,
  pages,
  userRelations,
  users,
} from "./schema.ts";

export const db = drizzle({
  connection: {
    url: Deno.env.get("TURSO_DATABASE_URL") ?? "missing TURSO_DATABASE_URL",
    authToken: Deno.env.get("TURSO_AUTH_TOKEN"),
  },
  schema: {
    users,
    userRelations,
    pages,
    pageRelations,
    links,
    linkRelations,
    files,
    forms,
    formRelations,
    formSubmissions,
    formSubmissionRelations,
  },
  casing: "snake_case",
});
