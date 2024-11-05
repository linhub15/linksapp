import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer(),
  name: text(),
  email: text(),
});

export const pages = sqliteTable("pages", {
  id: text().$defaultFn(() => crypto.randomUUID()).primaryKey(),
  title: text().notNull(),
  urlSlug: text().notNull(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer({ mode: "timestamp_ms" }).$onUpdate(() => new Date()),
  publishedAt: integer({ mode: "timestamp_ms" }),
});

export const pageRelations = relations(pages, ({ many }) => ({
  links: many(links),
}));

export const links = sqliteTable("links", {
  id: text().$defaultFn(() => crypto.randomUUID()).primaryKey(),
  href: text().notNull(),
  label: text().notNull(),
  newTab: integer({ mode: "boolean" }).default(false),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
  pageId: text().notNull().references(() => pages.id, { onDelete: "cascade" }),
});

export const linkRelations = relations(links, ({ one }) => ({
  page: one(pages, {
    fields: [links.pageId],
    references: [pages.id],
  }),
}));

export const files = sqliteTable("files", {
  bucket: text(),
  key: text(),
  etag: text(),
  createdAt: text().default(sql`(CURRENT_TIMESTAMP)`),
});
