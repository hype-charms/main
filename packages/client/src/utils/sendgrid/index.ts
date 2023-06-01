export * from "./sendgrid"


/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as sgMail from "@sendgrid/mail";

declare global {
    const sendgrid: sgMail.MailService;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const sendgrid: sgMail.MailService = sgMail;