import { OpenAPIHono } from "@hono/zod-openapi";
import { configureOpenapi } from "../lib/configure_openapi.ts";
import type { AppEnv } from "../lib/types.ts";
import { linkCreate } from "./links/link_create.ts";
import { linkDelete } from "./links/link_delete.ts";
import { linkList } from "./links/link_list.ts";
import { linkUpdate } from "./links/link_update.ts";
import { pageCreate } from "./pages/page_create.ts";
import { pageUpdate } from "./pages/page_update.ts";
import { pageList } from "./pages/page_list.ts";
import { pageGet } from "./pages/page_get.ts";

export const app = new OpenAPIHono<AppEnv>();

configureOpenapi(app);

app.openapi(linkList.route, linkList.handler);
app.openapi(linkCreate.route, linkCreate.handler);
app.openapi(linkUpdate.route, linkUpdate.handler);
app.openapi(linkDelete.route, linkDelete.handler);

app.openapi(pageList.route, pageList.handler);
app.openapi(pageGet.route, pageGet.handler);
app.openapi(pageCreate.route, pageCreate.handler);
app.openapi(pageUpdate.route, pageUpdate.handler);
