import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiRequest } from "../../lib/trpc/client.ts";
import { pageKeys } from "./page.keys.ts";

export function useCreatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ApiRequest["pages"]["create"]) => {
      return await api.pages.create.mutate(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageKeys.list() });
    },
  });
}
