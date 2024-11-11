import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api/mod.ts";

export function useListPages() {
  return useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const { data } = await api.listPages();

      return data;
    },
  });
}
