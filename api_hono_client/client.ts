import type { AppType } from "./api.ts";
import { hc } from "hono/client";

const client = hc<AppType>("http://localhost:8000", {});

const res = await client.hello.$get({
  query: {
    name: "thing",
  },
});

const data = await res.json();
console.log(data);
