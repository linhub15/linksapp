import { useState } from "react";
import { LinkForm } from "./features/manage_links/LinkForm.tsx";
import {
  useCreateLink,
  useDeleteLink,
  useEditLink,
} from "./features/manage_links/mutations.ts";
import { useListLinks } from "./features/manage_links/queries.ts";

export function Links() {
  const [editId, setEditId] = useState<string | undefined>();
  const deleteLink = useDeleteLink();
  const createLink = useCreateLink();
  const editLink = useEditLink();
  const query = useListLinks();

  return (
    <div className="space-y-2">
      {query.data?.map((link) => (
        <div className="space-x-4" key={link.id}>
          <button
            className="p-1 bg-red-400 text-white"
            type="button"
            onClick={() => deleteLink.mutateAsync(link.id)}
          >
            Delete
          </button>

          {editId !== link.id
            ? (
              <>
                <span>
                  {link.label} - {link.href}{" "}
                  {link.newTab ? "(opens in new tab)" : ""}
                </span>
                <button
                  className="p-1 bg-green-300"
                  type="button"
                  onClick={() => {
                    setEditId(link.id);
                  }}
                >
                  edit
                </button>
              </>
            )
            : (
              <LinkForm
                value={link}
                onSubmit={async (data) => {
                  await editLink.mutateAsync(data);
                  setEditId(undefined);
                }}
                submitText="Save"
              />
            )}
        </div>
      ))}
      <LinkForm onSubmit={createLink.mutateAsync} submitText="Add"/>
    </div>
  );
}
