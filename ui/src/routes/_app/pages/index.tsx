import { createFileRoute, Link } from "@tanstack/react-router";
import { useListPages } from "../../../features/manage_pages/queries.ts";
import { Heading } from "../../../components/ui/heading.tsx";
import { buttonVariants } from "../../../components/ui/button.tsx";

export const Route = createFileRoute("/_app/pages/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useListPages();

  return (
    <>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Heading>Pages</Heading>
        <div className="flex gap-4">
          <Link
            className={buttonVariants({ variant: "solid" })}
            to={"/pages/new"}
          >
            New page
          </Link>
        </div>
      </div>
      <div className="py-8 space-y-4">
        {data?.map((page) => (
          <div key={page.id}>
            <Link
              className="block size-fit rounded-lg border border-zinc-400 px-6 py-4"
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
