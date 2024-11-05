import { useQuery } from "@tanstack/react-query";

export function useListPages() {
  return useQuery({
    queryKey: ["pages"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8000/pages");
      const text = await response.text();

      const json = JSON.parse(text, (key, value) => {
        if (key === "updatedAt" || key === "publishedAt") {
          if (!value) return;
          return new Date(value);
        }
        return value;
      }) as {
        id: string;
        title: string;
        urlSlug: string;
        updatedAt?: Date;
        publishedAt?: Date;
      }[];

      return json;
    },
  });
}
