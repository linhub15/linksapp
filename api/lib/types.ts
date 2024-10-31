import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Env } from "hono";

export interface AppEnv extends Env {
  Bindings?: object;
  Variables?: object;
}
export type App = OpenAPIHono<AppEnv>;
export type Handler<R extends RouteConfig> = RouteHandler<R, AppEnv>;
