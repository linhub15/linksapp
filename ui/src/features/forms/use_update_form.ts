import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiRequest } from "../../lib/trpc/client.ts";
import { formKeys } from "./form.keys.ts";

export function useUpdateForm() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: ApiRequest["forms"]["update"]) => {
      await api.forms.update.mutate(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formKeys.list() });
    },
  });
}
