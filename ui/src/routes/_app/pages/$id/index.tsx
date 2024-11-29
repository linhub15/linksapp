import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Links } from "../../../../features/manage_links/links.tsx";
import { Heading } from "../../../../components/ui/heading.tsx";
import { useListPages } from "../../../../features/manage_pages/queries.ts";
import { Button } from "../../../../components/ui/button.tsx";
import { useDeletePage } from "../../../../features/manage_pages/mutations.ts";
import { SectionNav } from "../../../../components/app/section_nav.tsx";

export const Route = createFileRoute("/_app/pages/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const id = Route.useParams().id;
  const { data, isSuccess, isLoading } = useListPages();
  const page = data?.find((page) => page.id === id);
  const deletePage = useDeletePage();
  const navigate = useNavigate();

  if (!page && isLoading) {
    return <div>...</div>;
  }

  if (!page && isSuccess) {
    navigate({ to: "/" });
    return;
  }

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <>
      <SectionNav backButtonLabel="Pages" />
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <div className="flex items-center gap-4">
          <Heading>{page.title}</Heading>
          <a
            className="hover:underline text-sm"
            href={`http://localhost:8000/p/${page.urlSlug}`}
          >
            Preview
          </a>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => deletePage.mutateAsync(id)}>
            Delete page
          </Button>
        </div>
      </div>
      <div className="py-6">
        <Links pageId={page.id} />
      </div>
    </>
  );
}
