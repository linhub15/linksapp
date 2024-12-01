import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <p>Built by Hubert Lin.</p>
    </>
  );
}
