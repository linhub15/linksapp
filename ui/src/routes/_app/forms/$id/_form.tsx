import {
  createFileRoute,
  Link,
  Outlet,
  useChildMatches,
} from "@tanstack/react-router";
import { RouteHeader } from "../../../../components/app/route_header.tsx";
import { SectionNav } from "../../../../components/app/section_nav.tsx";
import { buttonVariants } from "../../../../components/ui/button.tsx";
import { useGetForm } from "../../../../features/forms/use_get_form.tsx";

export const Route = createFileRoute("/_app/forms/$id/_form")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useGetForm(id);
  const childMatches = useChildMatches();

  if (!data) {
    return 404;
  }

  return (
    <>
      <RouteHeader
        title={data.title}
        navigationSlot={<SectionNav backButtonLabel="Forms" />}
        navTabSlot={
          <nav>
            <ul className="flex gap-2">
              <li
                className="pb-1 data-[current=true]:border-b-2"
                data-current={childMatches.at(0)?.fullPath === "/forms/$id/"}
              >
                <Link
                  className={buttonVariants({ variant: "ghost" })}
                  to="/forms/$id"
                  params={{ id }}
                >
                  Submissions
                </Link>
              </li>
              <li
                className="pb-1 data-[current=true]:border-b-2"
                data-current={childMatches
                  .at(0)
                  ?.fullPath.startsWith("/forms/$id/settings")}
              >
                <Link
                  className={buttonVariants({ variant: "ghost" })}
                  to="/forms/$id/settings"
                  params={{ id }}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        }
      />
      <Outlet />
    </>
  );
}
