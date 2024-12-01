import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { OAuthProfile } from "../../../../api/lib/auth/jwt.ts";
import { getUser } from "./client.ts";

export function useUser() {
  const router = useRouter();
  return useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const response = await getUser();

      if (response.status === 401) {
        router.navigate({ to: "/login" });
        throw new Error("Unauthorized");
      }

      return await response.json() as { profile: OAuthProfile };
    },
  });
}
