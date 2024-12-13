import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";
import { Toaster } from "../components/ui/toaster.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
      <Toaster />
    </>
  );
}
