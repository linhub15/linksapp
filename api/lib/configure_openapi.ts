import { apiReference } from "@scalar/hono-api-reference";
import type { App } from "./types.ts";

export function configureOpenapi(app: App) {
  app
    .doc("/openapi", {
      openapi: "3.0.0",
      info: {
        version: "1.0.0",
        title: "api",
      },
    })
    .get(
      "/",
      apiReference({
        spec: { url: "/openapi" },
        hiddenClients: {
          c: true,
          clojure: true,
          csharp: true,
          go: true,
          http: true,
          java: true,
          javascript: ["xhr", "axios", "jquery"],
          kotlin: true,
          node: true,
          objc: true,
          ocaml: true,
          php: true,
          powershell: true,
          python: true,
          r: true,
          ruby: true,
          shell: ["httpie", "wget"],
          swift: true,
        },
        layout: "modern",
        defaultHttpClient: { targetKey: "javascript", clientKey: "fetch" },
      }),
    );

  return app;
}
