import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import "react";
import "react-dom";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // @ts-expect-error: it works
    TanStackRouterVite({
      addExtensions: true,
      semicolons: true,
      quoteStyle: "double",
      routeTreeFileHeader: [
        `/// <reference types="@tanstack/react-router" />`,
        "// deno-lint-ignore-file",
      ],
      generatedRouteTree: "src/route_tree.gen.ts",
    }),
    // @ts-expect-error: it works
    react(),
    tailwindcss(),
  ],
});
