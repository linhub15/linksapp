import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  // todo: strongly type this
  const profile = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: () =>
      fetch("http://localhost:8000/auth/profile", {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return profile;
}

