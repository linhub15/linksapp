import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api/mod.ts";

export function useListLinks() {
  return useQuery({
    queryKey: ["pages", "links"],
    queryFn: async () => {
      const { data } = await api.listLinks();
      return data;
    },
  });
}
