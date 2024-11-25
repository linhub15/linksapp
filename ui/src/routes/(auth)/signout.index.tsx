import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../../components/ui/button.tsx";

export const Route = createFileRoute("/(auth)/signout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const signout = () => fetch("http://localhost:8000/auth/signout", {credentials: "include"});

  return (
    <>
      <Button type="button" onClick={signout}>
        Sign out
      </Button>
    </>
  );
}
