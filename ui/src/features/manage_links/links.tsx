import { useListLinks } from "./queries.ts";
import { usePublishPage } from "../manage_pages/mutations.ts";
import type { types } from "../../lib/api/mod.ts";
import { LinkCard } from "./link_card.tsx";
import { Heading } from "../../components/ui/heading.tsx";
import { AddLinkForm } from "./add_link_form.tsx";
import { buttonVariants } from "../../components/ui/button.tsx";

type Props = {
  page: types.Page;
};

export function Links(props: Props) {
  const query = useListLinks({ pageId: props.page.id });

  const publishPage = usePublishPage();

  const shouldPublish = (props.page?.updatedAt?.getTime() ?? 0) >
    (props.page?.publishedAt?.getTime() ?? 0);

  return (
    <div className="space-y-6">
      {query.data?.map((link) => (
        <div className="space-x-4" key={link.id}>
          <LinkCard link={link} />
        </div>
      ))}
      <>
        <Heading level={2}>Add link</Heading>
        <AddLinkForm pageId={props.page.id} />
        {shouldPublish && (
          <button
            className={buttonVariants({ outline: true })}
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
