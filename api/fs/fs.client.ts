import { ensureFile } from "@std/fs";
import { crypto } from "@std/crypto";

/** Local file system client */
export const fs = {
  write: async (args: { bucket: string; key: string; body: string }) => {
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
  read: async (args: { bucket: string; key: string }) => {
    const decoder = new TextDecoder("utf-8");
    const file = await Deno.readFile(`./fs/s3/${args.bucket}/${args.key}`);
    console.log(decoder.decode(file));
  },
};
