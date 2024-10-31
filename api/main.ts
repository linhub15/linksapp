import "@std/dotenv/load";
import { Hono } from "hono";
import { result } from "./db.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.json(result);
});

Deno.serve(app.fetch);
