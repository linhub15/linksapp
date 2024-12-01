import { createFileRoute, Link } from "@tanstack/react-router";
import { useListPages } from "../../../features/manage_pages/queries.ts";
import { buttonVariants } from "../../../components/ui/button.tsx";
import { RouteHeader } from "../../../components/app/route_header.tsx";

export const Route = createFileRoute("/_app/pages/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useListPages();

  return (
    <>
      <RouteHeader
        title="Pages"
        actionSlot={
          <Link
            className={buttonVariants({ variant: "solid" })}
            to={"/pages/new"}
          >
            New page
          </Link>
        }
      />
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
