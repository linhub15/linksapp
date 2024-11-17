import { router } from "../trpc.ts";
import { pagesRouter } from "./pages/pages.ts";

export const appRouter = router({
  pages: pagesRouter,
});

export type Router = typeof appRouter;
