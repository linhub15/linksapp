import { createFileRoute, useRouter } from "@tanstack/react-router";
import { CreatePageForm } from "../../../features/manage_pages/create_page_form.tsx";
import { SectionNav } from "../../../components/app/section_nav.tsx";
import { Heading } from "../../../components/ui/heading.tsx";

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
      <SectionNav backButtonLabel="Pages" />
      <Heading className="py-8">Create a new page</Heading>
      <CreatePageForm onSubmitSuccess={afterSubmit} />
    </div>
  );
}
