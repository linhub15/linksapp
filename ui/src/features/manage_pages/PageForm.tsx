import { useForm } from "@tanstack/react-form";
import { useListPages } from "./queries.ts";

type Props = {
  onSubmit: (title: string) => Promise<void>;
};

export function PageForm(props: Props) {
  const pages = useListPages();
  const form = useForm({
    defaultValues: {
      title: "",
    },
    onSubmit: async ({ value }) => {
      await props.onSubmit(value.title);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <>
      {pages.data && pages.data.length > 0
        ? (
          <div>
            {pages.data.at(0)?.title} - {pages.data.at(0)?.id}{" "}
            [{pages.data.at(0)?.urlSlug}]
          </div>
        )
        : (
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
        )}
    </>
  );
}
