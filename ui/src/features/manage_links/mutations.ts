import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { api, type types } from "../../lib/api/mod.ts";

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      { data, pageId }: { data: types.LinkCreate; pageId: string },
    ) => {
      await api.createLink({
        path: { pageId: pageId },
        body: {
          href: data.href,
          label: data.label,
          newTab: !!data.newTab,
        },
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
      await api.deleteLink({ path: { pageId, id } });
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
      { pageId, linkId, data }: {
        pageId: string;
        linkId: string;
        data: types.LinkUpdate;
      },
    ) => {
      const schema = z.object({
        href: z.string(),
        label: z.string(),
        newTab: z.boolean().optional(),
      });

      const body = schema.parse(data);

      await api.updateLink({
        path: { pageId, id: linkId },
        body: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}
