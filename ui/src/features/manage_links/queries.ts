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
