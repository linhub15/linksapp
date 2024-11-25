import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../../components/ui/button.tsx";

export const Route = createFileRoute("/(auth)/logout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signout = async () => {
    await fetch("http://localhost:8000/auth/signout", {
      credentials: "include",
    });
    queryClient.clear();
    router.navigate({ to: "/login" });
  };

  return (
    <>
      <Button type="button" onClick={signout}>
        Log out
      </Button>
    </>
  );
}
