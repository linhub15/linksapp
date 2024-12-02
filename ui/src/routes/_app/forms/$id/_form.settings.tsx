import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/forms/$id/_form/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/forms/$id/settings"!</div>;
}
