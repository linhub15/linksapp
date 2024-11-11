import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <p>Built by Hubert Lin.</p>
      <a href={import.meta.env.VITE_API_URL}>Open API Documentation</a>
    </>
  );
}
