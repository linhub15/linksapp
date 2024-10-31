import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer(),
  name: text(),
  email: text(),
});

export const links = sqliteTable("links", {
  id: text().$defaultFn(() => crypto.randomUUID()).primaryKey(),
  href: text().notNull(),
  label: text().notNull(),
  newTab: integer({ mode: "boolean" }).default(false),
});
