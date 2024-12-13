// @deno-types="npm:@types/nodemailer"
import nodemailer from "nodemailer";
import z from "zod";

const transportSchema = z.object({
  host: z.string(),
  port: z.number(),
  secure: z.boolean(),
  user: z.string(),
  password: z.string(),
  defaultFrom: z.string().email(),
});

const sendSchema = z.object({
  fromAlias: z.string().optional(),
  from: z.string().email().optional(),
  to: z.string().email(),
  subject: z.string(),
  text: z.string(),
  html: z.string().optional(),
}).transform((data) => {
  if (!data.from) {
    // biome-ignore lint/performance/noDelete: <explanation>
    delete data.from;
  }

  return {
    ...data,
    from: data.fromAlias ? `${data.fromAlias} <${data.from}>` : data.from,
  } as typeof data;
});

export class SmtpClient {
  #transporter: nodemailer.Transporter;

  constructor(options: z.infer<typeof transportSchema>) {
    this.#transporter = nodemailer.createTransport({
      host: options.host,
      port: options.port,
      secure: options.secure,
      auth: {
        user: options.user,
        pass: options.password,
      },
    }, {
      from: options.defaultFrom,
    });

    this.#transporter.verify((error, success) => {
      if (error) {
        console.error(error);
      } else {
        console.info(`SMTP ${options.host}`, success && "OK");
      }
    });
  }

  async send(sendOptions: z.infer<typeof sendSchema>) {
    const options = sendSchema.parse(sendOptions);

    const response: SendMailResponse = await this.#transporter.sendMail(
      options,
    );

    return response;
  }
}

type SendMailResponse = {
  accepted: string[];
  rejected: string[];
  ehlo: string[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: { from: string; to: string[] };
  messageId: string;
};
