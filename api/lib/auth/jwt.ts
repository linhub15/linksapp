import { SignJWT } from "jose/jwt/sign";
import { jwtVerify } from "jose/jwt/verify";
import type { JWTPayload } from "jose";
import { ENV } from "../env.ts";

export type OAuthProfile = {
  user_id: string;
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
};

type Payload = JWTPayload & {
  profile: OAuthProfile;
};

const secret = new TextEncoder().encode(ENV.AUTH_SECRET);
const alg = "HS256";

export async function decodeJwt(
  jwt?: string,
): Promise<Payload | undefined> {
  if (!jwt) return;

  try {
    const { payload } = await jwtVerify<Payload>(jwt, secret);
    return payload;
  } catch (error) {
    if (error instanceof Error) {
      console.error({ name: error.name, message: error.message });
    }
  }
}

export async function signJwt(payload: Payload) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("2h")
    .setSubject(payload.profile.sub)
    .sign(secret);

  return jwt;
}
