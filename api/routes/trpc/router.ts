import { htmlRouter } from "./html.router.ts";
import { linksRouter } from "./links.router.ts";
import { pagesRouter } from "./pages.router.ts";
import { router } from "./trpc.ts";

export const appRouter = router({
  pages: pagesRouter,
  pageLinks: linksRouter,
  html: htmlRouter,
});

export type Router = typeof appRouter;
