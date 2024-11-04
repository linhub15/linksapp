import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      await fetch("http://localhost:8000/pages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(data)),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}
