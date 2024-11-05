import { useQuery } from "@tanstack/react-query";
import { listLinks } from "../../lib/hey-client/mod.ts";

export function useListLinks() {
  return useQuery({
    queryKey: ["pages", "links"],
    queryFn: async () => {
      const { data } = await listLinks();
      return data;
    },
  });
}
