import { useForm } from "@tanstack/react-form";
import { type FormEvent, useState } from "react";

import { Button, buttonVariants } from "../../components/ui/button.tsx";
import type { types } from "../../lib/api/mod.ts";
import { useDeleteLink, useUpdateLink } from "./mutations.ts";

type Props = {
  link: types.Link;
};

export function LinkCard({ link }: Props) {
  const [editing, setEditing] = useState(!link || false);
  const deleteLink = useDeleteLink();
  const updateLink = useUpdateLink();

  const form = useForm({
    defaultValues: {
      label: link?.label ?? "",
      href: link?.href ?? "",
      newTab: link?.newTab ?? false,
    },
    onSubmit: async ({ value }) => {
      await updateLink.mutateAsync({
        pageId: link?.pageId,
        linkId: link?.id,
        data: value,
      });
      setEditing(false);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form
      className="max-w-xl p-4 pl-8 rounded-lg border border-zinc-700"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center">
        <div className="space-y-0.5 w-full">
          <form.Field name="label">
            {(field) => (
              <input
                className="block w-full border-none outline-none font-medium text-lg"
                name={field.name}
                type="text"
                placeholder="Title"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={!editing}
              />
            )}
          </form.Field>

          <form.Field name="href">
            {(field) => (
              <input
                className="block border-none outline-none text-zinc-400"
                name={field.name}
                type="text"
                placeholder="URL"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={!editing}
              />
            )}
          </form.Field>
        </div>
        <div>
          <form.Field name="newTab">
            {(field) => (
              <label className="text-sm text-nowrap">
                <span>Open in new tab {" "}</span>
                <input
                  name={field.name}
                  type="checkbox"
                  checked={!!field.state.value}
                  onChange={(e) => field.handleChange(!!e.target.checked)}
                  disabled={!editing}
                />
              </label>
            )}
          </form.Field>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        {editing
          ? (
            <>
              <button
                className={buttonVariants()}
                type="button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
              <Button type="submit">Save</Button>
            </>
          )
          : (
            <>
              <button
                className={buttonVariants()}
                type="button"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>

              <button
                className={buttonVariants()}
                type="button"
                onClick={() =>
                  deleteLink.mutateAsync({
                    pageId: link.pageId,
                    id: link.id,
                  })}
              >
                Delete
              </button>
            </>
          )}
      </div>
    </form>
  );
}
