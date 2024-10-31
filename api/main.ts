import { Hono } from "hono";
import { users } from "./db.ts";


const app = new Hono();

app.get("/", (c) => {
  return c.json(users);
});

Deno.serve(app.fetch);
