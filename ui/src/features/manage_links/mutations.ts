import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      { data, pageId }: { data: FormData; pageId: string },
    ) => {
      await fetch(`http://localhost:8000/pages/${pageId}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(data)),
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
