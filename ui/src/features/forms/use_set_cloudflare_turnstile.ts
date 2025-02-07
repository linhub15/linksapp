import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiRequest } from "../../lib/trpc/client.ts";
import { formKeys } from "./form.keys.ts";
import { useState } from "react";
import { toast } from "sonner";
import { useGetForm } from "./use_get_form.tsx";

export function useSetCloudflareTurnstile(id: string) {
  const { data: form } = useGetForm(id);
  const defaultValue = {
    siteKey: form?.cfTurnstileSiteKey ?? "",
    secretKey: form?.cfTurnstileSecretKey ?? "",
  };
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState<"view" | "edit">("view");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      request: ApiRequest["forms"]["setCloudflareTurnstile"],
    ) => await api.forms.setCloudflareTurnstile.mutate(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: formKeys.single(id) });
    },
  });

  const setSiteKey = (siteKey: string) => {
    setValue((prev) => ({ ...prev, siteKey }));
  };

  const setSecret = (secretKey: string) => {
    setValue((prev) => ({ ...prev, secretKey }));
  };

  const edit = () => {
    setMode("edit");
  };

  const canSave = value.siteKey !== defaultValue.siteKey ||
    value.secretKey !== defaultValue.secretKey;

  const save = async () => {
    await mutation.mutateAsync({
      id,
      cfTurnstileSiteKey: value.siteKey,
      cfTurnstileSecretKey: value.secretKey,
    });
    setMode("view");
    toast("Cloudflare Turnstile saved");
  };

  const cancel = () => {
    setValue(defaultValue);
    setMode("view");
  };

  return {
    mode,
    mutation,
    value,
    canSave,
    setSiteKey,
    setSecret,
    edit,
    save,
    cancel,
  };
}
