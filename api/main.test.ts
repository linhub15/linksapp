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

Deno.test("PUT /links/:id", async () => {
  const url = "http://0.0.0.0:8000/links/ad826265-0a40-4047-9871-64459df96b62";
  const data = { href: "https://deno.land", label: "asdfasdfsadf" };

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  await response.body?.cancel();

  assert(response.ok);
});
