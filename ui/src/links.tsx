import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function Links() {
  const queryClient = useQueryClient();
  const deleteLink = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:8000/links/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const query = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/links");
      return await response.json() as {
        id: string;
        href: string;
        label: string;
        newTab: boolean;
      }[];
    },
  });
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
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      await fetch("http://localhost:8000/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(data)),
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["links"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    await mutation.mutateAsync(formData);
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
