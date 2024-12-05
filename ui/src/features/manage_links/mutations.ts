import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { api, type ApiRequest } from "../../lib/trpc/client.ts";

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      request: ApiRequest["pageLinks"]["create"],
    ) => {
      await api.pageLinks.create.mutate({
        pageId: request.pageId,
        href: request.href,
        label: request.label,
        newTab: !!request.newTab,
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["pages"] });
    },
  });
}

export function useDeleteLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ pageId, id }: { pageId: string; id: string }) => {
      await api.pageLinks.delete.mutate({ page_id: pageId, link_id: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}

export function useUpdateLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      { target, values }: ApiRequest["pageLinks"]["update"],
    ) => {
      const schema = z.object({
        href: z.string(),
        label: z.string(),
        newTab: z.boolean().optional(),
      });

      const body = schema.parse(values);

      await api.pageLinks.update.mutate({
        target: target,
        values: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}
