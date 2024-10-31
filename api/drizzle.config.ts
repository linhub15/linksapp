import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: Deno.env.get("TURSO_DATABASE_URL") || "missing",
    authToken: Deno.env.get("TURSO_AUTH_TOKEN") || "missing",
  },
  casing: "snake_case",
} satisfies Config;
