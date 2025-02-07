import { createFileRoute, Link } from "@tanstack/react-router";
import { RouteHeader } from "../../../components/app/route_header.tsx";
import { buttonVariants } from "../../../components/ui/button.tsx";
import { useListForms } from "../../../features/forms/use_list_forms.ts";
import { useUser } from "../../../lib/auth/use_user.ts";
import { Badge } from "../../../components/ui/badge.tsx";

export const Route = createFileRoute("/_app/forms/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useUser();
  const { data } = useListForms();
  return (
    <div>
      <RouteHeader
        title="Forms"
        actionSlot={
          <Link className={buttonVariants()} to="/forms/new">
            Create new form
          </Link>
        }
      />
      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            <Link
              className="flex gap-4 border rounded-lg p-4 dark:hover:bg-zinc-800 hover:bg-zinc-200"
              to="/forms/$id"
              params={{ id: item.id }}
            >
              <div>
                {item.title}
              </div>

              <div>
                {item.targetEmail && item.targetEmailIsVerified
                  ? item.targetEmail
                  : user?.profile.email}
              </div>

              <div>
                {item.enabled && <Badge color="green">Enabled</Badge>}
                {!item.enabled && <Badge color="red">Disabled</Badge>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
