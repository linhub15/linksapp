import { useForm } from "@tanstack/react-form";
import type { FormEvent } from "react";
import { Button } from "../../components/ui/button.tsx";
import { Field, Legend } from "../../components/ui/fieldset.tsx";
import { Input } from "../../components/ui/input.tsx";
import { useCreatePage } from "./mutations.ts";

type Props = {
  onSubmitSuccess: () => void;
};

export function CreatePageForm(props: Props) {
  const createPage = useCreatePage();

  const form = useForm({
    defaultValues: {
      title: "",
    },
    onSubmit: async ({ value }) => {
      await createPage.mutateAsync({ title: value.title });
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
              <Legend>Give your page a name</Legend>
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
