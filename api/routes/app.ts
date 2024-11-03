import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import type { AppEnv } from "../lib/types.ts";
import { linkCreate } from "./link_create.ts";
import { linkDelete } from "./link_delete.ts";
import { linkList } from "./link_list.ts";
import { linkUpdate } from "./link_update.ts";

export const app = new OpenAPIHono<AppEnv>();

app.doc("/openapi", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "api",
  },
});
app.get("/", apiReference({ spec: { url: "/openapi" } }));

app.openapi(linkList.route, linkList.handler);
app.openapi(linkCreate.route, linkCreate.handler);
app.openapi(linkUpdate.route, linkUpdate.handler);
app.openapi(linkDelete.route, linkDelete.handler);
