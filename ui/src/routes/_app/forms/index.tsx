import { createFileRoute } from "@tanstack/react-router";
import { RouteHeader } from "../../../components/app/route_header.tsx";

export const Route = createFileRoute("/_app/forms/")({
  component: RouteComponent,
});

function RouteComponent() {
  // todo: build out form create & listing feature
  return (
    <div>
      <RouteHeader title="Forms" />
      <div>Create a new form</div>
    </div>
  );
}
