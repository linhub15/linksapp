import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { Router } from "../../../../api/routes/router.ts";

const url = new URL("/trpc", import.meta.env.VITE_API_URL);

export const api = createTRPCProxyClient<Router>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: url,
    }),
  ],
});

type RouterInput = inferRouterInputs<Router>;
type RouterOutputs = inferRouterOutputs<Router>;
