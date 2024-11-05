import { ensureFile } from "@std/fs";
import { crypto } from "@std/crypto";
import { tryFn } from "../lib/result.ts";

type Bucket = "html_pages";

/** Local file system client */
export const fs = {
  write: async (args: { bucket: Bucket; key: string; body: string }) => {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder("utf-8");
    const path = `./fs/s3/${args.bucket}/${args.key}`;
    await ensureFile(path);
    await Deno.writeFile(path, encoder.encode(args.body));

    const arrayBuffer = await crypto.subtle.digest(
      "MD5",
      encoder.encode(args.body),
    );
    const etag = decoder.decode(arrayBuffer);

    return { ETag: etag, VersionId: undefined };
  },
  read: async (args: { bucket: Bucket; key: string }) => {
    const decoder = new TextDecoder("utf-8");
    const result = await tryFn(async () => {
      const data = await Deno.readFile(`./fs/s3/${args.bucket}/${args.key}`);
      const html = decoder.decode(data);
      return html;
    });
    return result;
  },
};
