import { type FormEvent, useState } from "react";
import clsx from "clsx";
import { useForm } from "@tanstack/react-form";
import { useCreateLink } from "./mutations.ts";
import { buttonVariants } from "../../components/ui/button.tsx";

type Props = {
  pageId: string;
};

export function AddLinkForm(props: Props) {
  const [submitting, setSubmitting] = useState(false);
  const createLink = useCreateLink();
  const form = useForm({
    defaultValues: {
      href: "",
      newTab: true,
    },
    onSubmit: async ({ value }) => {
      setSubmitting(true);
      const title = await fetchTitle(value.href);
      await createLink.mutateAsync({
        pageId: props.pageId,
        href: value.href,
        newTab: value.newTab,
        label: title,
      });
      form.reset();
      setSubmitting(false);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (submitting) return;
    form.handleSubmit();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-8">
          <form.Field name="href">
            {(field) => (
              <input
                className={clsx("block rounded-lg p-4 min-w-sm", {
                  "aniamte-pulse": submitting,
                })}
                name={field.name}
                type="text"
                placeholder="URL"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={submitting}
              />
            )}
          </form.Field>

          <button
            className={buttonVariants()}
            type="submit"
            disabled={submitting}
          >
            {submitting ? <div className="animate-spin">wee</div> : "Add Link"}
          </button>
        </div>
      </form>
    </div>
  );
}

async function fetchTitle(url: string) {
  try {
    const response = await fetch(url);
    const text = await response.text();

    // Parse the HTML using DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");

    if (!doc) return "";

    // Extract the title
    const title = doc.querySelector("title")?.innerText;
    return title ?? "";
  } catch (error) {
    console.error("Error fetching page title:", error);
    return "";
  }
}
