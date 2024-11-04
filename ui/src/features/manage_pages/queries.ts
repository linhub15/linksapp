import { useQuery } from "@tanstack/react-query";

export function useListPages() {
  return useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/pages");
      return await response.json() as {
        id: string;
        title: string;
        urlSlug: string;
      }[];
    },
  });
}
