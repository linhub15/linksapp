import { useForm } from "@tanstack/react-form";
import type { FormEvent } from "react";

type Props = {
  onSubmit: (title: string) => Promise<void>;
};

export function PageForm(props: Props) {
  const form = useForm({
    defaultValues: {
      title: "",
    },
    onSubmit: async ({ value }) => {
      await props.onSubmit(value.title);
      form.reset();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <form.Field name="title">
          {(field) => (
            <label>
              <span>Title</span>
              <input
                name={field.name}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </label>
          )}
        </form.Field>

        <button type="submit">Save</button>
      </form>
    </>
  );
}
