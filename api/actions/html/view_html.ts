import { fs } from "../../fs/fs.client.ts";

export async function viewHtml(slug: string) {
  const html = await fs.read({
    bucket: "html_pages",
    key: slug,
  });

  return html;
}
