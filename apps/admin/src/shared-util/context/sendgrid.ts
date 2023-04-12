import * as sgMail from '@sendgrid/mail'

declare global {
    // eslint-disable-next-line no-var
    const sendgrid: typeof sgMail | undefined;
}
  
export const sendgrid: sgMail.MailService = sgMail;
