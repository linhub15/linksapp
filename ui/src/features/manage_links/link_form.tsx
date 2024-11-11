import { useForm } from "@tanstack/react-form";
import type { types } from "../../lib/api/mod.ts";
import type { FormEvent } from "react";

type Props = {
  defaultValue?: types.LinkCreate | types.LinkUpdate;
  onSubmit: (data: types.LinkCreate | types.LinkUpdate) => Promise<void>;
  submitText?: string;
};

export function LinkForm(props: Props) {
  const form = useForm({
    defaultValues: props.defaultValue,
    onSubmit: async ({ value }) => {
      await props.onSubmit(value);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <form.Field name="href">
        {(field) => (
          <label>
            <span>href</span>
            <input
              name={field.name}
              type="text"
              placeholder="url"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </label>
        )}
      </form.Field>

      <form.Field name="label">
        {(field) => (
          <label>
            <span>label</span>
            <input
              name={field.name}
              type="text"
              placeholder="url label"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </label>
        )}
      </form.Field>

      <form.Field name="newTab">
        {(field) => (
          <label>
            <span>open in new tab</span>
            <input
              name={field.name}
              type="checkbox"
              checked={!!field.state.value}
              onChange={(e) => field.handleChange(!!e.target.checked)}
            />
          </label>
        )}
      </form.Field>

      <button type="submit">{props.submitText || "Submit"}</button>
    </form>
  );
}
