import { useListLinks } from "./queries.ts";
import { usePublishPage } from "../manage_pages/mutations.ts";
import { LinkCard } from "./link_card.tsx";
import { Heading } from "../../components/ui/heading.tsx";
import { AddLinkForm } from "./add_link_form.tsx";
import { buttonVariants } from "../../components/ui/button.tsx";
import { useGetPage } from "../manage_pages/queries.ts";

type Props = {
  pageId: string;
};

export function Links(props: Props) {
  const { data: page } = useGetPage(props.pageId);
  const query = useListLinks({ pageId: props.pageId });
  const publishPage = usePublishPage();

  if (!page) {
    return null;
  }

  const shouldPublish = (page?.updatedAt?.getTime() ?? 0) >
    (page?.publishedAt?.getTime() ?? 0);

  return (
    <div className="space-y-6">
      {query.data?.map((link) => (
        <div className="space-x-4" key={link.id}>
          <LinkCard linkId={link.id} pageId={link.pageId} />
        </div>
      ))}
      <>
        <Heading level={2}>Add link</Heading>
        <AddLinkForm pageId={page?.id} />
        {shouldPublish && (
          <button
            className={buttonVariants({ outline: true })}
            type="button"
            onClick={() => publishPage.mutateAsync(props.pageId)}
          >
            Publish page
          </button>
        )}
      </>
    </div>
  );
}
