import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function Links() {
  const query = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/links");
      return response.json();
    },
  });
  return (
    <>
      {JSON.stringify(query.data)}
      <LinkForm />
    </>
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
