import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";

export function useListLinks({ pageId }: { pageId: string }) {
  return useQuery({
    queryKey: ["pages", pageId, "links"],
    queryFn: async () => {
      return await api.pageLinks.list.query({ page_id: pageId });
    },
  });
}

export function useGetLink(
  { pageId, linkId }: { pageId: string; linkId: string },
) {
  const { data: links } = useListLinks({ pageId: pageId });
  return links?.find((link) => link.id === linkId);
}
