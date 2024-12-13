import z from "zod";
import { authEnvSchema } from "./auth/options.ts";
import { smtpEnvSchema } from "./smtp/options.ts";

const envSchema = z.object({
  APP_URL: z.string().url(),
});

export const ENV = envSchema
  .merge(authEnvSchema)
  .merge(smtpEnvSchema)
  .parse(Deno.env.toObject());
