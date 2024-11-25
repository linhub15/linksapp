import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { Router } from "../../../../api/routes/trpc/router.ts";
import { router } from "../../main.tsx";

const url = new URL("/trpc", import.meta.env.VITE_API_URL);

export const api = createTRPCProxyClient<Router>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: url,
      async fetch(input, init) {
        const response = await fetch(input, {
          ...init,
          credentials: "include",
        });

        if (response.status === 401) {
          router.navigate({ to: "/login" });
        }

        return response;
      },
    }),
  ],
});

export type ApiRequest = inferRouterInputs<Router>;
export type ApiResponse = inferRouterOutputs<Router>;
