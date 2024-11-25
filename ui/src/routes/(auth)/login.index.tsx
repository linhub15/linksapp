import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <a href="http://localhost:8000/auth/signin">
        Login with Google
      </a>
    </>
  );
}
