import { useRouter } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const signout = useMutation({
    mutationFn: async () => {
      await fetch("http://localhost:8000/auth/signout", {
        credentials: "include",
      });
    },
    onSuccess: () => {
      queryClient.clear();
      router.navigate({ to: "/login" });
    },
  });

  return signout;
}
