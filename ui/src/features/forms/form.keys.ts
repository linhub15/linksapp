export const formKeys = {
  all: ["forms"] as const,
  list: () => [...formKeys.all, "list"] as const,
  single: (formId: string) => [...formKeys.all, formId] as const,
};
