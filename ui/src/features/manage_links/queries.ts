import { useQuery } from "@tanstack/react-query";

export function useListLinks() {
  return useQuery({
    queryKey: ["pages", "links"],
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
}
