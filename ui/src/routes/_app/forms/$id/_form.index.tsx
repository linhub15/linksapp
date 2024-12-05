import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";

import { CodeBlock, Text } from "../../../../components/ui/text.tsx";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Subheading } from "../../../../components/ui/heading.tsx";
import { Button, buttonVariants } from "../../../../components/ui/button.tsx";
import { api } from "../../../../lib/trpc/client.ts";

export const Route = createFileRoute("/_app/forms/$id/_form/")({
  loader: ({ params: { id } }) => api.forms.get.query({ form_id: id }),
  component: RouteComponent,
});

function RouteComponent() {
  const form = Route.useLoaderData();
  const [index, setIndex] = useState(0);

  if (!form) {
    // todo(feat): notify not found, redirecting
    return <Navigate to=".." />;
  }

  const { id } = form;

  if (!form?.submissions || form?.submissions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <Cog6ToothIcon className="size-12 text-zinc-500 dark:text-zinc-400" />
        <div className="text-center">
          <Subheading>No submissions</Subheading>
          <Text>Add your form to your site to get started</Text>
        </div>
        <div>
          <Link
            className={buttonVariants({ variant: "outline" })}
            to="/forms/$id/settings"
            params={{ id }}
          >
            Setup instructions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      <div className="w-84 space-y-4 px-2 overflow-y-scroll">
        {form.submissions.map((submission, idx) => (
          <div key={submission.id}>
            <Button
              variant="outline"
              className="w-full space-x-4 dark:data-[current=true]:bg-zinc-700 data-[current=true]:bg-zinc-200"
              type="button"
              onClick={() => setIndex(idx)}
              data-current={index === idx}
            >
              <span>
                {submission.createdAt.toLocaleDateString()}
              </span>
              <span>
                {submission.ip}
              </span>
            </Button>
          </div>
        ))}
      </div>
      <CodeBlock className="rounded-2xl bg-gray-700 w-full h-100 p-6">
        {JSON.stringify(form.submissions[index].data, null, 2)}
      </CodeBlock>
    </div>
  );
}
