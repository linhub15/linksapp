import { html } from "hono/html";
import { db } from "../db/db.client.ts";
import { fs } from "../fs/fs.client.ts";
import { files } from "../db/schema.ts";
import { err, ok, type Result } from "../lib/result.ts";
import type { HtmlEscapedString } from "hono/utils/html";

export async function generateHtml(
  id: string,
): Promise<Result<HtmlEscapedString>> {
  const page = await db.query.pages.findFirst({
    where: (page, { eq }) => eq(page.id, id),
    with: { links: true },
  });

  if (!page) {
    return err<HtmlEscapedString>("Page not found");
  }

  const content = await html`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title}</title>
</head>
<body>
  <h1>${page.title}</h1>
  ${
    page.links.map(async (link) =>
      await html`
      <div>
      <a
        href="${link.href}"
        target="${link.newTab ? "_blank" : "_self"}">
        ${link.label}
      </a>
      </div>`
    )
  }
</body>
</html>
`;

  const response = await fs.write({
    bucket: "html_pages",
    key: page.urlSlug,
    body: content,
  });

  if (!response.ETag) {
    return err<HtmlEscapedString>("Error writing to bucket");
  }

  await db.insert(files).values({
    bucket: "html_pages",
    key: page.urlSlug,
    etag: response.ETag,
  });

  return ok(content);
}
