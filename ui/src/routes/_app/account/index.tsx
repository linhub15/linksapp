import { createFileRoute } from "@tanstack/react-router";
import { Heading, Subheading } from "../../../components/ui/heading.tsx";
import { useUser } from "../../../lib/auth/use_user.ts";
import { Input } from "../../../components/ui/input.tsx";
import { Divider } from "../../../components/ui/divider.tsx";

export const Route = createFileRoute("/_app/account/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useUser();
  return (
    <div className="max-w-3xl mx-auto">
      <Heading>Account Settings</Heading>
      <Divider />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <Subheading>Your email</Subheading>
          <p className="text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
            Email associated with Google
          </p>
        </div>
        <div>
          <Input type="email" value={data?.profile.email} disabled />
        </div>
      </section>

      {/* todo(feat): user preferences */}
    </div>
  );
}
