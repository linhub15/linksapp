import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api/mod.ts";

import { api as trpc, type ApiRequest } from "../../lib/trpc/client.ts";

export function useCreatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ApiRequest["pages"]["create"]) => {
      return await trpc.pages.create.mutate(data);
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
        body: { page_id: id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}

export function useDeletePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.deletePage({
        path: { page_id: id },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}
