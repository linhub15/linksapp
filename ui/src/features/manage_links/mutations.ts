import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "../../lib/hey-client/mod.ts";

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
      await fetch(`http://localhost:8000/pages/${pageId}/links/${id}`, {
        method: "DELETE",
      });
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
      await fetch(
        `http://localhost:8000/pages/${pageId}/links/${data.get("id")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(data)),
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}
