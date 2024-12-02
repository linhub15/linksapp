import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";

export function useGetForm(formId: string) {
  return useQuery({
    queryKey: ["form", formId],
    queryFn: async () => {
      return await api.forms.get.query({ form_id: formId });
    },
  });
}
