import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { OAuthProfile } from "../../../../api/lib/auth/jwt.ts";
import { getProfile } from "./client.tsx";

export function useProfile() {
  const router = useRouter();
  const profile = useQuery({
    queryKey: ["auth", "profile"],
    queryFn: async () => {
      const response = await getProfile();

      if (response.status === 401) {
        router.navigate({ to: "/login" });
        throw new Error("Unauthorized");
      }

      return await response.json() as { profile: OAuthProfile };
    },
  });

  return profile;
}
