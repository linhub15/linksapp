import { useForm } from "@tanstack/react-form";
import type { FormEvent } from "react";
import { Button } from "../../components/ui/button.tsx";
import { Field, Label } from "../../components/ui/fieldset.tsx";
import { Input } from "../../components/ui/input.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ApiRequest } from "../../lib/trpc/client.ts";

type Props = {
  onSubmitSuccess: () => void;
};

export function CreateFormForm(props: Props) {
  const createForm = useCreateForm();

  const form = useForm({
    defaultValues: {
      title: "",
    },
    onSubmit: async ({ value }) => {
      await createForm.mutateAsync({ title: value.title });
      form.reset();
      props.onSubmitSuccess();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-12">
        <form.Field name="title">
          {(field) => (
            <Field>
              <Label>Give your form a name</Label>
              <Input
                className="max-w-[20rem]"
                name={field.name}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </Field>
          )}
        </form.Field>

        <div>
          <Button type="submit">Submit</Button>
        </div>
      </div>
    </form>
  );
}

function useCreateForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: ApiRequest["forms"]["create"]) => {
      return await api.forms.create.mutate({
        title: input.title,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forms"] });
    },
  });
}
