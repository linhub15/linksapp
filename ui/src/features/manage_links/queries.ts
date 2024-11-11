import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api/mod.ts";

export function useListLinks({ pageId }: { pageId: string }) {
  return useQuery({
    queryKey: ["pages", pageId, "links"],
    queryFn: async () => {
      const { data } = await api.listLinks({ path: { page_id: pageId } });
      return data;
    },
  });
}
