import { ENV } from "../env.ts";
import { SmtpClient } from "./smtp_client.ts";

/** System SMTP client to send transactional emails */
export const mailer = new SmtpClient({
  host: ENV.SMTP_HOST,
  port: ENV.SMTP_PORT,
  secure: ENV.SMTP_SECURE,
  user: ENV.SMTP_USER,
  password: ENV.SMTP_PASSWORD,
  defaultFrom: ENV.SMTP_FROM,
});
