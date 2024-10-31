import "@std/dotenv/load";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { createLink } from "./actions/create_link.ts";
import { db, result } from "./db.ts";
import { links } from "./db/schema.ts";
import type { AppEnv } from "./lib/types.ts";

const app = new OpenAPIHono<AppEnv>();

app.get("/", (c) => {
  return c.json(result);
});

app.get("/links", async (c) => {
  const data = await db.select().from(links);
  return c.json(data);
});

app.openapi(createLink.route, createLink.handler);

app.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "api",
  },
});

app.get("/reference", apiReference({ spec: { url: "/openapi" } }));

Deno.serve(app.fetch);
