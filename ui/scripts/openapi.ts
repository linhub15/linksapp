import { createClient, defineConfig } from "@hey-api/openapi-ts";

const outDir = "src/lib/hey-client";

await createClient(defineConfig({
  experimentalParser: true,
  client: "@hey-api/client-fetch",
  input: "http://localhost:8000/openapi",
  output: outDir,
  plugins: [
    "@hey-api/schemas",
    "@hey-api/types",
    {
      name: "@hey-api/services",
    },
    // Date transformations only works if the openapi spec is a $ref type,
    // right now z.ZodDate is a string type so it doesn't transform
    {
      dates: true,
      name: "@hey-api/transformers",
    },
  ],
}));

await Deno.rename(`${outDir}/index.ts`, `${outDir}/mod.ts`);

const lint = new Deno.Command("deno", {
  args: ["lint", "--unstable-sloppy-imports", "--fix", outDir],
});

const fmt = new Deno.Command("deno", {
  args: ["fmt", outDir],
});

await lint.output();
await fmt.output();
