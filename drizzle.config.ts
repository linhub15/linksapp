import { defineConfig } from "npm:drizzle-kit";

export default defineConfig({
  dialect: "turso",
  schema: "./api/db/schema.ts",
});
