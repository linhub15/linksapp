import { useState } from "react";
import { LinkForm } from "./link_form.tsx";
import { useCreateLink, useDeleteLink, useUpdateLink } from "./mutations.ts";
import { useListLinks } from "./queries.ts";
import { usePublishPage } from "../manage_pages/mutations.ts";
import type { types } from "../../lib/api/mod.ts";

type Props = {
  page: types.Page;
};

export function Links(props: Props) {
  const [editId, setEditId] = useState<string | undefined>();
  const deleteLink = useDeleteLink();
  const createLink = useCreateLink();
  const updateLink = useUpdateLink();
  const query = useListLinks();

  const publishPage = usePublishPage();

  const shouldPublish = (props.page?.updatedAt?.getTime() ?? 0) >
    (props.page?.publishedAt?.getTime() ?? 0);

  return (
    <div className="space-y-2">
      {query.data?.map((link) => (
        <div className="space-x-4" key={link.id}>
          <button
            className="p-1 bg-red-400 text-white"
            type="button"
            onClick={() =>
              deleteLink.mutateAsync({ pageId: props.page.id, id: link.id })}
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
                defaultValue={link}
                onSubmit={async (data) => {
                  await updateLink.mutateAsync({
                    pageId: props.page.id,
                    linkId: link.id,
                    data,
                  });
                  setEditId(undefined);
                }}
                submitText="Save"
              />
            )}
        </div>
      ))}
      <>
        <LinkForm
          onSubmit={(data) =>
            createLink.mutateAsync({ data, pageId: props.page.id })}
          submitText="Add"
        />
        {shouldPublish && (
          <button
            className="bg-green-300 p-1"
            type="button"
            onClick={() => publishPage.mutateAsync(props.page.id)}
          >
            Publish page
          </button>
        )}
      </>
    </div>
  );
}
