import { createFileRoute } from "@tanstack/react-router";
import { useGetForm } from "../../../../features/forms/use_get_form.tsx";
import { useState } from "react";

export const Route = createFileRoute("/_app/forms/$id/_form/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useGetForm(id);

  const [index, setIndex] = useState(0);

  if (!data?.submissions || data?.submissions.length === 0) {
    return (
      <div>
        no submissions yet, setup your form
        <div>Form submission URL</div>
        <div>Example</div>
      </div>
    );
  }

  return (
    <div className="flex gap-8">
      <div className="w-56 space-y-4">
        {data.submissions.map((submission, idx) => (
          <div key={submission.id}>
            <button
              className="w-full space-x-4 px-4 py-2 hover:bg-zinc-800 rounded data-[current=true]:bg-zinc-700"
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
            </button>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-gray-700 w-full h-100 p-6">
        {JSON.stringify(data.submissions[index].data, null, 2)}
      </div>
    </div>
  );
}
