import { createFileRoute, Link } from "@tanstack/react-router";
import { PageForm } from "../features/manage_pages/page_manage.tsx";
import { useListPages } from "../features/manage_pages/queries.ts";
import { useCreatePage } from "../features/manage_pages/mutations.ts";

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
      <h1 className="text-xl">LinksApp</h1>
      {data?.map((page) => (
        <div key={page.id}>
          <Link to="/pages/$id" params={{ id: page.id }}>{page.title}</Link>
        </div>
      ))}
      <PageForm onSubmit={handleSubmit} />
    </>
  );
}
