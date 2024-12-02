import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";

export function useListForms() {
  return useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      return await api.forms.list.query();
    },
  });
}
