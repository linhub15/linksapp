import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { api, type ApiRequest } from "../../../lib/trpc/client.ts";
import { pageKeys } from "../page.keys.ts";

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
    onSuccess: (_, variables) => {
      queryClient.refetchQueries({
        queryKey: pageKeys.single(variables.pageId),
      });
    },
  });
}

export function useDeleteLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      { pageId, linkId }: { pageId: string; linkId: string },
    ) => {
      await api.pageLinks.delete.mutate({ page_id: pageId, link_id: linkId });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: pageKeys.links(variables.pageId),
      });
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
        href: z.string().transform((val, ctx) => {
          let url = val;
          try {
            if (!url.startsWith("http")) {
              url = `https://${url}`;
            }

            new URL(url);

            return url;
          } catch {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid URL",
            });
            return z.NEVER;
          }
        }),
        label: z.string(),
        newTab: z.boolean().optional(),
      });

      const body = schema.parse(values);

      await api.pageLinks.update.mutate({
        target: target,
        values: body,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: pageKeys.single(variables.target.page_id),
      });
    },
  });
}
