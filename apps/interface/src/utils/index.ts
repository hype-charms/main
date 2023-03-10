export * from "./sendgrid"

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MongoClient } from "mongodb";
import * as sgMail from "@sendgrid/mail";

declare global {
    const mongo: MongoClient;
    const sendgrid: sgMail.MailService;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const mongo = new MongoClient(process.env.MONGODB_URI!, {});
export const sendgrid: sgMail.MailService = sgMail;
