import { createFileRoute } from "@tanstack/react-router";
import { Links } from "../../features/manage_links/links.tsx";

export const Route = createFileRoute("/pages/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const id = Route.useParams().id;
  return (
    <>
      <Links pageId={id} />
    </>
  );
}
