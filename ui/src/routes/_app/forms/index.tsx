import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/forms/")({
  component: RouteComponent,
});

function RouteComponent() {
  // todo: build out form create & listing feature
  return (
    <div>
      <div>List of forms</div>
      <div>Create a new form</div>
    </div>
  );
}
