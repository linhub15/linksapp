import { createFileRoute, useRouter } from "@tanstack/react-router";
import { CreatePageForm } from "../../../features/link_in_bio/create_page_form.tsx";
import { SectionNav } from "../../../components/app/section_nav.tsx";
import { RouteHeader } from "../../../components/app/route_header.tsx";

export const Route = createFileRoute("/_app/pages/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();

  const afterSubmit = () => {
    router.navigate({ to: ".." });
  };

  return (
    <div>
      <RouteHeader
        title="Create new page"
        navigationSlot={<SectionNav backButtonLabel="Pages" />}
      />
      <CreatePageForm onSubmitSuccess={afterSubmit} />
    </div>
  );
}
