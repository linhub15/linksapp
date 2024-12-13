import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";

import { CodeBlock, Text } from "../../../../components/ui/text.tsx";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Subheading } from "../../../../components/ui/heading.tsx";
import { Button, buttonVariants } from "../../../../components/ui/button.tsx";
import { api } from "../../../../lib/trpc/client.ts";
import { toast } from "sonner";
import z from "zod";
import { maskDate } from "../../../../lib/masks/mask_date.ts";

const searchSchema = z.object({
  view: z.union([z.literal("preview"), z.literal("json")]).optional(),
});

export const Route = createFileRoute("/_app/forms/$id/_form/")({
  loader: ({ params: { id } }) => api.forms.get.query({ form_id: id }),
  component: RouteComponent,
  validateSearch: searchSchema,
});

function RouteComponent() {
  const search = Route.useSearch();
  const form = Route.useLoaderData();
  const [index, setIndex] = useState(0);

  if (!form) {
    toast("Form not found");
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
            to="/forms/$id/quickstart"
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
      <div className="w-84 space-y-4 pr-4 overflow-y-auto max-h-150">
        {form.submissions.map((submission, idx) => (
          <div key={submission.id}>
            <Button
              variant="outline"
              className="w-full space-x-4 dark:data-[current=true]:bg-zinc-700 data-[current=true]:bg-zinc-200"
              type="button"
              onClick={() => setIndex(idx)}
              data-current={index === idx}
            >
              {maskDate(submission.createdAt)}
            </Button>
          </div>
        ))}
      </div>
      <section className="w-full space-y-2">
        <div>
          <Link
            className="inline-block rounded-xl p-2 size-fit bg-zinc-950/[2.5%] data-[active=true]:dark:bg-white/5"
            to="."
            search={{ view: "preview" }}
            data-active={!search.view || search.view === "preview"}
          >
            Preview
          </Link>
          <Link
            className="inline-block rounded-xl p-2 size-fit bg-zinc-950/[2.5%] data-[active=true]:dark:bg-white/5"
            to="."
            search={{ view: "json" }}
            data-active={search.view === "json"}
          >
            JSON
          </Link>
        </div>
        {(!search.view || search.view === "preview") && (
          <CodeBlock className="rounded-2xl">
            <dl className="divide-y divide-gray-700 dark:divide-gray-500">
              {Object.entries(
                form.submissions.at(index)?.data as Record<
                  string,
                  string
                >,
              ).map((
                [key, value],
              ) => (
                <div
                  className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                  key={key}
                >
                  <dt className="">
                    {key}
                  </dt>
                  <dd className="mt-1 text-sm/6 sm:col-span-2 sm:mt-0">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </CodeBlock>
        )}
        {search.view === "json" && (
          <CodeBlock className="rounded-2xl p-6">
            {JSON.stringify(form.submissions[index].data, null, 2)}
          </CodeBlock>
        )}
      </section>
    </div>
  );
}
