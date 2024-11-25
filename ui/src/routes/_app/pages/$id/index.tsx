import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Links } from "../../../../features/manage_links/links.tsx";
import { Heading } from "../../../../components/ui/heading.tsx";
import { useListPages } from "../../../../features/manage_pages/queries.ts";
import { Button } from "../../../../components/ui/button.tsx";
import { useDeletePage } from "../../../../features/manage_pages/mutations.ts";

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
      <div className="max-lg:hidden">
        <Link
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
          data-headlessui-state=""
          to=".."
        >
          <svg
            className="size-4 fill-zinc-400 dark:fill-zinc-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path
              fillRule="evenodd"
              d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          Pages
        </Link>
      </div>
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
          <Button outline onClick={() => deletePage.mutateAsync(id)}>
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
