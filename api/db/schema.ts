import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/// Auth
export const users = sqliteTable("users", {
  id: text().$defaultFn(() => crypto.randomUUID()).primaryKey(),
  email: text().notNull().unique(),
  emailVerified: integer({ mode: "boolean" }).notNull().default(false),
  given_name: text().notNull(),
  family_name: text().notNull(),
  createdAt: integer({ mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date()),
});

export const userRelations = relations(users, ({ many }) => ({
  pages: many(pages),
  forms: many(forms),
}));

/// Pages
export const pages = sqliteTable("pages", {
  id: text().$defaultFn(() => crypto.randomUUID()).primaryKey(),
  title: text().notNull(),
  urlSlug: text().notNull(),
  createdAt: integer({ mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date()),
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
  createdAt: integer({ mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date()),
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
  createdAt: integer({ mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date()),
});

/// Forms
export const forms = sqliteTable("forms", {
  id: text().$defaultFn(() => crypto.randomUUID()).primaryKey(),
  title: text().notNull(),
  createdAt: integer({ mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date()),
  userId: text().notNull().references(() => users.id, { onDelete: "cascade" }),
});

export const formRelations = relations(forms, ({ one, many }) => ({
  user: one(users, {
    fields: [forms.userId],
    references: [users.id],
  }),
  submissions: many(formSubmissions),
}));

export const formSubmissions = sqliteTable("form_submissions", {
  id: text().$defaultFn(() => crypto.randomUUID()).primaryKey(),
  createdAt: integer({ mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date()),
  ip: text().notNull(),
  data: text({ mode: "json" }).notNull(),
  formId: text().notNull().references(() => forms.id, { onDelete: "cascade" }),
});

export const formSubmissionRelations = relations(
  formSubmissions,
  ({ one }) => ({
    form: one(forms, {
      fields: [formSubmissions.formId],
      references: [forms.id],
    }),
  }),
);
