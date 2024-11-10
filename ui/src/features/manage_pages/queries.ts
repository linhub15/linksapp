import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api/api.ts";
import { toDate } from "../../lib/transformers/to_date.ts";

export function useListPages() {
  return useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const { data } = await api.listPages();

      // todo: find a better way to transform these to dates
      return data?.map((page) => ({
        ...page,
        updatedAt: toDate(page.updatedAt),
        createdAt: toDate(page.createdAt),
        publishedAt: toDate(page.publishedAt),
      }));
    },
  });
}
