import { useState } from "react";
import { LinkForm } from "./LinkForm.tsx";
import {
  useCreateLink,
  useDeleteLink,
  useUpdateLink,
} from "./mutations.ts";
import { useListLinks } from "./queries.ts";
import { PageForm } from "../manage_pages/PageForm.tsx";
import {
  useCreatePage,
  usePublishPage,
} from "../manage_pages/mutations.ts";
import { useListPages } from "../manage_pages/queries.ts";

export function Links() {
  const [editId, setEditId] = useState<string | undefined>();
  const deleteLink = useDeleteLink();
  const createLink = useCreateLink();
  const updateLink = useUpdateLink();
  const query = useListLinks();

  const createPage = useCreatePage();
  const pageList = useListPages();
  const publishPage = usePublishPage();

  const currentPage = pageList.data?.at(0);

  const shouldPublish = (currentPage?.updatedAt?.getTime() ?? 0) >
    (currentPage?.publishedAt?.getTime() ?? 0);

  const handleSubmit = async (title: string) => {
    if (!title) return;
    await createPage.mutateAsync({ title: title });
  };

  if (!currentPage) return <PageForm onSubmit={handleSubmit} />;

  return (
    <div className="space-y-2">
      {query.data?.map((link) => (
        <div className="space-x-4" key={link.id}>
          <button
            className="p-1 bg-red-400 text-white"
            type="button"
            onClick={() =>
              deleteLink.mutateAsync({ pageId: currentPage.id, id: link.id })}
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
                    pageId: currentPage.id,
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
            createLink.mutateAsync({ data, pageId: currentPage.id })}
          submitText="Add"
        />
        {shouldPublish && (
          <button
            className="bg-green-300 p-1"
            type="button"
            onClick={() => publishPage.mutateAsync(currentPage.id)}
          >
            Publish page
          </button>
        )}
      </>
    </div>
  );
}
