type Props = {
  value?: { id: string; href: string; label: string; newTab: boolean };
  onSubmit: (data: FormData) => Promise<void>;
  submitText?: string;
};

export function LinkForm(props: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await props.onSubmit(formData);
  };

  const { value } = props;

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input name="id" type="hidden" defaultValue={value?.id} />
      <label>
        <span>href</span>
        <input
          name="href"
          type="text"
          placeholder="url"
          defaultValue={value?.href}
        />
      </label>

      <label>
        <span>label</span>
        <input
          name="label"
          type="text"
          placeholder="url label"
          defaultValue={value?.label}
        />
      </label>

      <label>
        <span>open in new tab</span>
        <input
          name="newTab"
          type="checkbox"
          defaultChecked={value?.newTab}
        />
      </label>

      <button type="submit">{props.submitText || "Submit"}</button>
    </form>
  );
}
