import sendgrid from '@sendgrid/mail';

export const sendWelcomeEmail = async (email: string) => {
    const welcomeEmail = {
        to: email,
        from: 'donotreply@hypecharms.store',
        subject: 'Welcome to our email list!',
        text: 'Thank you for signing up for our email list. We promise to only send you the best content.'
    };
    const confirmEmail = {
        to: 'admin@hypecharms.store',
        from: 'donotreply@hypecharms.store',
        subject: 'New email list subscriber',
        text: `A new subscriber has signed up with the email address: ${email}`
    };
    await sendgrid.send(welcomeEmail);
    await sendgrid.send(confirmEmail);
}

export const sendOrderConfirmationEmail = async (email: string | null | undefined, orderId: string, receipt_url: string | null) => {
    if (email) {
        const receiptEmail = {
            to: email,
            from: 'donotreply@hypecharms.store',
            subject: 'Thank you for shoppping at hype charms!',
            text: `Thank you for for ordering from hype charms. Your order id is ${orderId}, Please find your receipt here ${receipt_url}`
        };
        const adminEmail = {
            to: 'admin@hypecharms.store',
            from: 'donotreply@hypecharms.store',
            subject: 'New order created',
            text: `A new order has been placed with the email address: ${email} and order id ${orderId}`
        };
        await sendgrid.send(receiptEmail);
        await sendgrid.send(adminEmail);
    }
}

export const sendOrderFailedEmail = async (email: string | null, orderId: string) => {
    if (email) {
        const receiptEmail = {
            to: email,
            from: 'donotreply@hypecharms.store',
            subject: 'There was an issue processing your order',
            text: `There was an issue processing you hype charms order. If you believe this is a mistake please contact us with your order id`
        };
        const adminEmail = {
            to: 'admin@hypecharms.store',
            from: 'donotreply@hypecharms.store',
            subject: 'Order failed',
            text: `A order has recently failed with the following id ${orderId}`
        };
        await sendgrid.send(receiptEmail);
        await sendgrid.send(adminEmail);
    }
}

export const sendDisputeReceivedEmail = async (email: string | null | undefined, id: string) => {
    if (email) {
        const adminEmail = {
            to: 'enquiries@hypecharms.store',
            from: 'donotreply@hypecharms.store',
            subject: 'Dispute created',
            text: `A a customer @${email} has recently disputed an order with the dispute id: ${id}`
        };
        await sendgrid.send(adminEmail);
    }
}