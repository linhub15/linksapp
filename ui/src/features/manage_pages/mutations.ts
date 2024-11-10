import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api/api.ts";

export function useCreatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: api.PageCreate) => {
      await api.createPage({
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}

export function usePublishPage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.generateHtml({
        body: { pageId: id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}
