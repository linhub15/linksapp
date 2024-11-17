import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./router.ts";
import superjson from "superjson";

const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "http://localhost:8787/trpc",
    }),
  ],
});

const data = await client.hello.query("Hono");
await client.thing.mutate({ id: "123" });
console.log(data);
