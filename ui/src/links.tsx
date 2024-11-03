import {
  useCreateLink,
  useDeleteLink,
} from "./features/manage_links/mutations.ts";
import { useListLinks } from "./features/manage_links/queries.ts";

export function Links() {
  const deleteLink = useDeleteLink();
  const query = useListLinks();

  return (
    <div className="space-y-2">
      {query.data?.map((link) => (
        <div className="space-x-4" key={link.id}>
          <button
            className="p-1 bg-red-400 text-white"
            type="button"
            onClick={() => deleteLink.mutateAsync(link.id)}
          >
            Delete
          </button>
          <span>
            {link.label} - {link.href} {link.newTab ? "(opens in new tab)" : ""}
          </span>
        </div>
      ))}
      <LinkForm />
    </div>
  );
}

function LinkForm() {
  const createLink = useCreateLink();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    await createLink.mutateAsync(formData);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <label>
        <span>href</span>
        <input name="href" type="text" placeholder="url" />
      </label>

      <label>
        <span>label</span>
        <input name="label" type="text" placeholder="url label" />
      </label>

      <label>
        <span>open in new tab</span>
        <input name="newTab" type="checkbox" value="true" />
      </label>

      <button type="submit">Add</button>
    </form>
  );
}
