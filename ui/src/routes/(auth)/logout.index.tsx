import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../../components/ui/button.tsx";
import { useSignout } from "../../lib/auth/use_signout.ts";

export const Route = createFileRoute("/(auth)/logout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const signout = useSignout();
  return (
    <>
      <Button
        type="button"
        onClick={() => signout.mutateAsync({})}
      >
        Log out
      </Button>
    </>
  );
}
