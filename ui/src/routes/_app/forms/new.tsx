import { createFileRoute, useRouter } from "@tanstack/react-router";
import { RouteHeader } from "../../../components/app/route_header.tsx";
import { SectionNav } from "../../../components/app/section_nav.tsx";
import { CreateFormForm } from "../../../features/forms/create_form_form.tsx";

export const Route = createFileRoute("/_app/forms/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const afterSubmit = (id: string) => {
    router.navigate({ to: "/forms/$id/quickstart", params: { id: id } });
  };

  return (
    <div>
      <RouteHeader
        title="Create new form"
        navigationSlot={<SectionNav backButtonLabel="Forms" />}
      />

      <CreateFormForm onSubmitSuccess={afterSubmit} />
    </div>
  );
}
