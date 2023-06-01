import { sendgrid } from ".."

export const sendWelcomeEmail = async (email: string) => {
    if (!email) {
        throw new Error("email is undefined")
    }
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)
    const welcomeEmail = {
        to: email,
        from: 'donotreply@hypecharms.store',
        templateId: process.env.WELCOME_EMAIL_ID!,
        dynamicTemplateData: {
            email: email
        }
    };
    const confirmEmail = {
        to: 'admin@hypecharms.store',
        from: 'donotreply@hypecharms.store',
        templateId: process.env.WELCOME_EMAIL_ID!,
        dynamicTemplateData: {
            email: email
        }
    };
    await sendgrid.send(welcomeEmail);
    await sendgrid.send(confirmEmail);
}