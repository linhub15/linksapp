/**
 * This file runs as .cjs because of npm:drizzle-kit.
 * Treat this like it's being run by `node.js`.
 */
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

/** To satisfy Deno typing errors */
// @deno-types="npm:@types/node"
import process from "node:process";

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL || "missing",
    authToken: process.env.TURSO_AUTH_TOKEN || "missing",
  },
  casing: "snake_case",
});
