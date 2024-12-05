import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";
import { pageKeys } from "./page.keys.ts";

export function usePublishPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.html.generate.mutate({
        page_id: id,
      });

      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: pageKeys.single(variables) });
    },
  });
}
