// todo(hack): https://github.com/denoland/deno/issues/25341
// Try removing it and see if intellisense works when importing types from react

declare module "react" {
  // @ts-types="npm:@types/react"
  import React from "npm:react@18.3.1";
  // @ts-ignore: it works
  export = React;
}
