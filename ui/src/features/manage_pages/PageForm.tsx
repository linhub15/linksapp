import { useListPages } from "./queries.ts";

type Props = {
  onSubmit: (data: FormData) => Promise<void>;
};

export function PageForm(props: Props) {
  const pages = useListPages();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    props.onSubmit(formData);
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
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              <span>Title</span>
              <input name="title" type="text" />
            </label>

            <button type="submit">Save</button>
          </form>
        )}
    </>
  );
}
