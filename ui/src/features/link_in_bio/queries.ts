import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";
import { pageKeys } from "./page.keys.ts";

export function useListPages() {
  return useQuery({
    queryKey: pageKeys.list(),
    queryFn: async () => {
      return await api.pages.list.query();
    },
  });
}

export function useGetPage(id: string) {
  return useQuery({
    queryKey: pageKeys.single(id),
    queryFn: async () => {
      return await api.pages.get.query({ page_id: id });
    },
  });
}
