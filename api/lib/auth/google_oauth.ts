import { OAuth2Client } from "@cmd-johnson/oauth2-client";
import { ENV } from "../env.ts";

const google = {
  authorizationEndpointUri: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUri: "https://oauth2.googleapis.com/token",
  profileUri: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
};

export const googleOAuth = new OAuth2Client({
  clientId: ENV.AUTH_GOOGLE_CLIENT_ID,
  clientSecret: ENV.AUTH_GOOGLE_CLIENT_SECRET,
  authorizationEndpointUri: google.authorizationEndpointUri,
  tokenUri: google.tokenUri,
  defaults: {
    scope: ["profile", "email", "openid"],
  },
});

type GoogleProfile = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

export async function fetchGoogleProfile(
  accessToken: string,
): Promise<GoogleProfile> {
  const response = await fetch(google.profileUri, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  return await response.json() as GoogleProfile;
}
