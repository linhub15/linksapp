import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiRequest } from "../../lib/trpc/client.ts";
import { formKeys } from "./form.keys.ts";
import { useState } from "react";
import { useGetForm } from "./use_get_form.tsx";
import { toast } from "sonner";

export function useManageEmail(id: string) {
  const { data: form } = useGetForm(id);
  const [defaultValue, setDefaultValue] = useState(form?.targetEmail ?? "");
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (request: ApiRequest["forms"]["setTargetEmail"]) => {
      await api.forms.setTargetEmail.mutate(request);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: formKeys.list() });
    },
  });

  const edit = () => {
    setMode("edit");
  };

  const canSave = value !== defaultValue;

  const save = async () => {
    await mutation.mutateAsync({ id: id, targetEmail: value });
    setDefaultValue(value);
    setMode("view");
    toast("Email saved");
  };

  const cancel = () => {
    setValue(defaultValue);
    setMode("view");
  };
  return { mutation, value, mode, setValue, canSave, save, edit, cancel };
}
