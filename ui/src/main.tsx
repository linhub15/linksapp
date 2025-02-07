/// <reference lib="dom" />

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

/** Tailwind */
import "./main.css";

/** Tanstack Query Client */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();

/** Tanstack Router */
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./route_tree.gen.ts";
export const router = createRouter({ routeTree, scrollRestoration: true });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
