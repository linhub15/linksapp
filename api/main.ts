import "@std/dotenv/load";

import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { linkCreate } from "./actions/link_create.ts";
import { linkUpdate } from "./actions/link_update.ts";
import { db } from "./db.ts";
import { links } from "./db/schema.ts";
import type { AppEnv } from "./lib/types.ts";

const app = new OpenAPIHono<AppEnv>();

app.get("/links", async (c) => {
  const data = await db.select().from(links);
  return c.json(data);
});

app.openapi(linkCreate.route, linkCreate.handler);
app.openapi(linkUpdate.route, linkUpdate.handler);

app.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "api",
  },
});

app.get("/", apiReference({ spec: { url: "/openapi" } }));

Deno.serve(app.fetch);
