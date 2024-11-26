import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppLayout } from "../components/app/app_layout.tsx";
import { isAuthenticated } from "../lib/auth/client.ts";

export const Route = createFileRoute("/_app")({
  beforeLoad: async ({ location }) => {
    const ok = await isAuthenticated();
    if (!ok) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
