import { router } from "../trpc.ts";
import { linksRouter } from "./links.router.ts";
import { pagesRouter } from "./pages.router.ts";

export const appRouter = router({
  pages: pagesRouter,
  pageLinks: linksRouter,
});

export type Router = typeof appRouter;
