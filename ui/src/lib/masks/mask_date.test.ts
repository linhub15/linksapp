import { maskDate } from "./mask_date.ts";
import { assertEquals } from "@std/assert";

Deno.test("mask date for today", () => {
  const now = new Date("2024-01-01T00:00:00");
  const masked = maskDate(
    new Date("2024-01-01T01:00:00"),
    { now },
  );

  assertEquals(masked, "1:00 AM");
});

Deno.test("mask date before today", () => {
  const now = new Date("2024-01-10T00:00:00");
  const masked = maskDate(
    new Date("2024-01-09T01:00:00"),
    { now },
  );

  assertEquals(masked, "Jan 9");
});

Deno.test("mask date from a previous year", () => {
  const now = new Date("2024-01-10T00:00:00");
  const masked = maskDate(
    new Date("2023-08-09T01:00:00"),
    { now },
  );

  assertEquals(masked, "8/9/23");
});
