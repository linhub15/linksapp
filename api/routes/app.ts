import { OpenAPIHono } from "@hono/zod-openapi";
import { configureOpenapi } from "../lib/configure_openapi.ts";
import type { AppEnv } from "../lib/types.ts";
import { linkCreate } from "./links/link_create.ts";
import { linkDelete } from "./links/link_delete.ts";
import { linkUpdate } from "./links/link_update.ts";
import { htmlGenerate } from "./html/html_generate.ts";
import { htmlView } from "./html/html_view.ts";

export const app = new OpenAPIHono<AppEnv>();
configureOpenapi(app);

app.openapi(linkCreate.route, linkCreate.handler);
app.openapi(linkUpdate.route, linkUpdate.handler);
app.openapi(linkDelete.route, linkDelete.handler);

app.openapi(htmlGenerate.route, htmlGenerate.handler);
app.openapi(htmlView.route, htmlView.handler);
