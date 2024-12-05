import { useQuery } from "@tanstack/react-query";
import { api } from "../../../lib/trpc/client.ts";
import { pageKeys } from "../page.keys.ts";

export function useListLinks({ pageId }: { pageId: string }) {
  return useQuery({
    queryKey: pageKeys.links(pageId),
    queryFn: async () => {
      return await api.pageLinks.list.query({ page_id: pageId });
    },
  });
}
