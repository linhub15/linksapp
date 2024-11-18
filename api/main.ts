/** EFFECT: load .env into process */
import "@std/dotenv/load";

/** EFFECT: mounts all routes */
import { app } from "./routes/hono.ts";

Deno.serve(app.fetch);
