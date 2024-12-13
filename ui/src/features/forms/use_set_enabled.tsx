import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiRequest } from "../../lib/trpc/client.ts";
import { formKeys } from "./form.keys.ts";

export function useSetEnabled(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request: ApiRequest["forms"]["setEnabled"]) => {
      await api.forms.setEnabled.mutate(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formKeys.single(id) });
    },
  });
}
