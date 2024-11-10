import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { createLink } from "../../lib/hey-client/mod.ts";
import { api } from "../../lib/api/api.ts";

export function useCreateLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      { data, pageId }: { data: FormData; pageId: string },
    ) => {
      await createLink({
        path: { pageId: pageId },
        body: {
          href: data.get("href") as string,
          label: data.get("label") as string,
          newTab: !!data.get("newTab"),
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
      { pageId, data }: { pageId: string; data: FormData },
    ) => {
      const schema = z.object({
        id: z.string(),
        href: z.string(),
        label: z.string(),
        newTab: z.boolean().optional(),
      });

      const body = schema.parse(Object.fromEntries(data));

      await api.updateLink({
        path: { pageId, id: body.id },
        body: body,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}
