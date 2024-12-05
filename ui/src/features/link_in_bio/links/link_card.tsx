import { useForm } from "@tanstack/react-form";
import { type FormEvent, useState } from "react";

import { Button } from "../../../components/ui/button.tsx";
import { useDeleteLink, useUpdateLink } from "./mutations.ts";
import { Switch } from "../../../components/ui/switch.tsx";
import type { ApiResponse } from "../../../lib/trpc/client.ts";

type Props = {
  link: ApiResponse["pageLinks"]["list"][0];
};

export function LinkCard({ link }: Props) {
  const [editing, setEditing] = useState(false);
  const deleteLink = useDeleteLink();
  const updateLink = useUpdateLink();

  const form = useForm({
    // todo(bug): fieldstate.value does not update when state is refreshed
    defaultValues: {
      label: link?.label ?? "",
      href: link?.href ?? "",
      newTab: link?.newTab ?? false,
    },
    onSubmit: async ({ value }) => {
      await updateLink.mutateAsync({
        target: {
          page_id: link.pageId,
          link_id: link.id,
        },
        values: value,
      });
      setEditing(false);
    },
  });

  const handleCancel = () => {
    form.reset();
    setEditing(false);
  };

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

          {/* For debugging */}
          {link.href}
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
              <div className="flex items-end justify-center gap-1.5">
                <label className="text-sm text-nowrap" htmlFor={field.name}>
                  New tab
                </label>
                <Switch
                  id={field.name}
                  name={field.name}
                  checked={!!field.state.value}
                  onChange={(checked) => field.handleChange(checked)}
                  disabled={!editing}
                />
              </div>
            )}
          </form.Field>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        {editing
          ? (
            <>
              <Button
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </>
          )
          : (
            <>
              <Button
                type="button"
                onClick={() => setEditing(true)}
              >
                Edit
              </Button>

              <Button
                type="button"
                onClick={() =>
                  deleteLink.mutateAsync({
                    pageId: link.pageId,
                    linkId: link.id,
                  })}
              >
                Delete
              </Button>
            </>
          )}
      </div>
    </form>
  );
}
