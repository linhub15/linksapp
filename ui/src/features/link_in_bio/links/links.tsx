import { useListLinks } from "./queries.ts";
import { usePublishPage } from "../use_publish_page.ts";
import { LinkCard } from "./link_card.tsx";
import { Heading } from "../../../components/ui/heading.tsx";
import { AddLinkForm } from "./add_link_form.tsx";
import { Button } from "../../../components/ui/button.tsx";
import { useGetPage } from "../queries.ts";

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
          <LinkCard link={link} />
        </div>
      ))}
      <>
        <Heading level={2}>Add link</Heading>
        <AddLinkForm pageId={page?.id} />
        {shouldPublish && (
          <Button
            variant="outline"
            type="button"
            onClick={() => publishPage.mutateAsync(props.pageId)}
          >
            Publish page
          </Button>
        )}
      </>
    </div>
  );
}
