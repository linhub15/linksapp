import { useState } from "react";
import { LinkForm } from "./features/manage_links/LinkForm.tsx";
import {
  useCreateLink,
  useDeleteLink,
  useEditLink,
} from "./features/manage_links/mutations.ts";
import { useListLinks } from "./features/manage_links/queries.ts";
import { PageForm } from "./features/manage_pages/PageForm.tsx";
import { useCreatePage } from "./features/manage_pages/mutations.ts";
import { useListPages } from "./features/manage_pages/queries.ts";

export function Links() {
  const [editId, setEditId] = useState<string | undefined>();
  const deleteLink = useDeleteLink();
  const createLink = useCreateLink();
  const editLink = useEditLink();
  const query = useListLinks();

  const createPage = useCreatePage();
  const pageList = useListPages();

  const currentPage = pageList.data?.at(0);

  return (
    <div className="space-y-2">
      <PageForm onSubmit={createPage.mutateAsync} />

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
      {currentPage &&
        (
          <LinkForm
            onSubmit={(data) =>
              createLink.mutateAsync({ data, pageId: currentPage.id })}
            submitText="Add"
          />
        )}
    </div>
  );
}
