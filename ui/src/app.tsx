import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./app.css";
import { client } from "./lib/hey-client/mod.ts";

const queryClient = new QueryClient();

client.setConfig({
  baseUrl: import.meta.env.VITE_API_URL,
});

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
export const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
