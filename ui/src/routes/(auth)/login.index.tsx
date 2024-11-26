import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { signin } from "../../lib/auth/client.tsx";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/(auth)/login/")({
  validateSearch: loginSearchSchema.parse,
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  const href = signin;

  if (redirect) {
    href.searchParams.set("redirect", redirect);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <a
        className="px-4 py-2 rounded border"
        href={href.toString()}
      >
        Login with Google
      </a>
    </div>
  );
}
