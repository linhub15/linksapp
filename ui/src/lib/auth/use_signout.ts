import { useRouter } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout } from "./client.tsx";

export function useSignout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      _variables?: { redirect?: string },
    ) => {
      await signout();
    },
    onSuccess: (_, variables) => {
      queryClient.clear();
      router.navigate({
        to: "/login",
        search: { redirect: variables?.redirect },
      });
    },
  });
}
