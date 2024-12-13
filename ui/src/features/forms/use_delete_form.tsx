import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";
import { formKeys } from "./form.keys.ts";

export function useDeleteForm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formId: string) => {
      await api.forms.delete.mutate({ form_id: formId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formKeys.list() });
    },
  });
}
