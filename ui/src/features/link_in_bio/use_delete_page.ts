import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";
import { pageKeys } from "./page.keys.ts";

export function useDeletePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.pages.delete.mutate({
        page_id: id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pageKeys.list() });
    },
  });
}
