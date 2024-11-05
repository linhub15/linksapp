import { createClient } from "@hey-api/openapi-ts";

const outDir = "src/lib/hey-client";

await createClient({
  client: "@hey-api/client-fetch",
  input: "http://localhost:8000/openapi",
  output: outDir,
});

await Deno.rename(`${outDir}/index.ts`, `${outDir}/mod.ts`);

const lint = new Deno.Command("deno", {
  args: ["lint", "--unstable-sloppy-imports", "--fix", outDir],
});

const fmt = new Deno.Command("deno", {
  args: ["fmt", outDir],
});

await lint.output();
await fmt.output();
