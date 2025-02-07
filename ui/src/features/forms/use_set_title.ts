import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/trpc/client.ts";
import { formKeys } from "./form.keys.ts";
import { useGetForm } from "./use_get_form.ts";
import { useState } from "react";
import { toast } from "sonner";

export function useSetTitle(id: string) {
  const { data: form } = useGetForm(id);
  const defaultValue = form?.title;
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | undefined>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (title: string) => api.forms.update.mutate({ id, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: formKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: formKeys.single(id),
      });
    },
  });

  const change = (title: string) => {
    setValue(title);

    if (!value) {
      setError("Title is required");
    }
  };

  const save = async () => {
    const v = value?.trim();
    setValue(v);

    if (!v) {
      setError("Title is required");
      return;
    }

    if (v === defaultValue) {
      return;
    }

    setError(undefined);
    await mutation.mutateAsync(v);
    toast("Form title saved");
  };

  const dirty = value !== defaultValue;

  return { value, mutation, error, dirty, save, change };
}
