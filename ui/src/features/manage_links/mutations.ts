import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:8000/links/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
}

export function useCreateLink() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      await fetch("http://localhost:8000/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(data)),
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["links"] });
    },
  });
}
