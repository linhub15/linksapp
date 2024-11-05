import { createRoute, z } from "@hono/zod-openapi";
import { generateHtml } from "../../actions/generate_html.ts";
import type { Handler } from "../../lib/types.ts";

const route = createRoute({
  method: "post",
  path: "/html/generate",
  description: "Generate static HTML for a specific page",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({ pageId: z.string().uuid() }).required(),
        },
      },
    },
  },
  responses: {
    200: { description: "Returns content: `text/html`" },
    500: { description: "Internal Server Error" },
  },
  tags: ["html"],
});

const handler: Handler<typeof route> = async (c) => {
  const id = c.req.valid("json").pageId;

  const result = await generateHtml(id);

  if (!result.ok) {
    return c.text(result.error.message, 500);
  }

  return c.html(result.value);
};

export const htmlGenerate = { route, handler };
