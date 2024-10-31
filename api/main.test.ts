import { assert } from "@std/assert";

Deno.test("POST request test", async () => {
  const url = "http://0.0.0.0:8000/links";
  const data = { href: "https://deno.land", label: "Deno" };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await response.body?.cancel();

  assert(response.ok);
});
