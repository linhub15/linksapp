import { createFileRoute } from "@tanstack/react-router";
import { Links } from "../features/manage_links/Links.tsx";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className="text-xl">LinksApp</h1>
      <Links />
    </>
  );
}
