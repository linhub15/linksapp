import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";

export function useListPages() {
  return useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      return await api.pages.list.query();
    },
  });
}
