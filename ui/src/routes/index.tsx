import { createFileRoute, Link } from "@tanstack/react-router";
import { PageForm } from "../features/manage_pages/page_manage.tsx";
import { useListPages } from "../features/manage_pages/queries.ts";
import { useCreatePage } from "../features/manage_pages/mutations.ts";
import { Heading } from "../components/ui/heading.tsx";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useListPages();
  const createPage = useCreatePage();

  const handleSubmit = async (title: string) => {
    if (!title) return;
    await createPage.mutateAsync({ title: title });
  };

  return (
    <>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>Pages</Heading>
        <div className="flex gap-4">
          <PageForm onSubmit={handleSubmit} />
        </div>
      </div>
      <div className="py-8 space-y-4">
        {data?.map((page) => (
          <div key={page.id}>
            <Link
              className="block size-fit rounded-lg border border-1 border-zinc-400 px-6 py-4"
              to="/pages/$id"
              params={{ id: page.id }}
            >
              {page.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
