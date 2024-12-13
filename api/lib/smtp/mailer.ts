import { SMTP_ENV } from "./options.ts";
import { SmtpClient } from "./smtp_client.ts";

/** System SMTP client to send transactional emails */
export const mailer = new SmtpClient({
  host: SMTP_ENV.SMTP_HOST,
  port: SMTP_ENV.SMTP_PORT,
  secure: SMTP_ENV.SMTP_SECURE,
  user: SMTP_ENV.SMTP_USER,
  password: SMTP_ENV.SMTP_PASSWORD,
  defaultFrom: SMTP_ENV.SMTP_FROM,
});
