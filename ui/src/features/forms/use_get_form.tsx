import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";
import { formKeys } from "./form.keys.ts";

export function useGetForm(formId: string) {
  return useQuery({
    queryKey: formKeys.single(formId),
    queryFn: async () => {
      return await api.forms.get.query({ form_id: formId });
    },
  });
}
