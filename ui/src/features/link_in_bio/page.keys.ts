export const pageKeys = {
  all: ["pages"] as const,
  list: () => [...pageKeys.all, "list"] as const,
  single: (pageId: string) => [...pageKeys.all, "single", pageId] as const,
  links: (pageId: string) => [...pageKeys.single(pageId), "links"] as const,
};
