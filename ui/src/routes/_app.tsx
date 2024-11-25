import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppLayout } from "../components/app/app_layout.tsx";

export const Route = createFileRoute("/_app")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
