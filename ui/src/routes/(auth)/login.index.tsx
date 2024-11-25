import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex items-center justify-center h-screen">
      <a
        className="px-4 py-2 rounded border"
        href="http://localhost:8000/auth/signin?redirect=http://localhost:5173"
      >
        Login with Google
      </a>
    </div>
  );
}
