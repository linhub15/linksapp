import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";
import { formKeys } from "./query_keys.ts";

export function useListForms() {
  return useQuery({
    queryKey: formKeys.list(),
    queryFn: async () => {
      return await api.forms.list.query();
    },
  });
}
