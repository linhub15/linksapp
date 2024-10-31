import "@std/dotenv/load";
import { Hono } from "hono";
import { db, result } from "./db.ts";
import { links } from "./db/schema.ts";

const app = new Hono();

app.get("/", (c) => {
  return c.json(result);
});

type LinksInsert = typeof links.$inferInsert;

app.post("/links", async (c) => {
  const body = await c.req.json();

  const link: LinksInsert = {
    href: body.href,
    label: body.label,
  };

  await db.insert(links).values(link);

  return c.text("ok");
});

app.get("/links", async (c) => {
  const data = await db.select().from(links);
  return c.json(data);
});

Deno.serve(app.fetch);
