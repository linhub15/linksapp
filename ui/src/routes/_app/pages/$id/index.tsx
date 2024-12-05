import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Links } from "../../../../features/link_in_bio/links/links.tsx";
import { useListPages } from "../../../../features/link_in_bio/queries.ts";
import { Button, buttonVariants } from "../../../../components/ui/button.tsx";
import { useDeletePage } from "../../../../features/link_in_bio/use_delete_page.ts";
import { SectionNav } from "../../../../components/app/section_nav.tsx";
import { RouteHeader } from "../../../../components/app/route_header.tsx";

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
      <RouteHeader
        title={page.title}
        navigationSlot={<SectionNav backButtonLabel="Pages" />}
        actionSlot={
          <div className="flex items-center gap-4">
            {/* todo(bug): only preview if page html exists. style: add external link logo */}
            <a
              className={buttonVariants({ variant: "ghost" })}
              href={`http://localhost:8000/p/${page.urlSlug}`}
            >
              Preview
            </a>
            {/* todo(feat): confirmation dialog */}
            <Button
              variant="outline"
              onClick={() => deletePage.mutateAsync(id)}
            >
              Delete page
            </Button>
          </div>
        }
      />
      <div className="py-6">
        <Links pageId={page.id} />
      </div>
    </>
  );
}
