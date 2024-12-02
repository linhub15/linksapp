import { createFileRoute } from "@tanstack/react-router";
import { RouteHeader } from "../../../components/app/route_header.tsx";
import { buttonVariants } from "../../../components/ui/button.tsx";
import { Link } from "../../../components/ui/link.tsx";
import { useListForms } from "../../../features/forms/use_list_forms.tsx";

export const Route = createFileRoute("/_app/forms/")({
  component: RouteComponent,
});

function RouteComponent() {
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
        {data?.map((item) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </div>
  );
}
