import { createFileRoute } from "@tanstack/react-router";
import { Links } from "../../features/manage_links/links.tsx";
import { Heading } from "../../components/ui/heading.tsx";
import { useListPages } from "../../features/manage_pages/queries.ts";

export const Route = createFileRoute("/pages/$id/")({
  component: RouteComponent,
});

function RouteComponent() {
  const id = Route.useParams().id;
  const { data } = useListPages();
  const page = data?.find((page) => page.id === id);

  if (!page) return;

  return (
    <>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>{page.title}</Heading>
        <div className="flex gap-4">
        </div>
      </div>
      <div className="py-6">
        <Links page={page} />
      </div>
    </>
  );
}
