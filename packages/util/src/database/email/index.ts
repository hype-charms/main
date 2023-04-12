import { email_dto } from "@prisma/client";
import { prisma } from "../index"
import { SubState } from "@hype-charms/types"

//GET
export namespace email {

    export const retreiveByEmail = async (email: string): Promise<email_dto | undefined | null> => {
        return await prisma?.email_dto.findFirst({ where: { email } }).then((data) => {
            prisma?.$disconnect()
            return data
        });
    }

    export const retreiveAll = async (): Promise<email_dto[] | undefined> => {
        return prisma?.email_dto.findMany().then((data) => {
            prisma?.$disconnect()
            return data
        });
    }


    //POST
    export const insert = async (email: string): Promise<email_dto | undefined> => {
        return prisma?.email_dto.create({ data: { email } }).then((data) => {
            prisma?.$disconnect()
            return data
        });
    }

    //PUT

    export const updateVerification = async (email: string | undefined) => {
        if (!email) { throw new Error("email is undefined") }
        const user = await retreiveByEmail(email);
        if (user && !user?.verified) {
            return await prisma.email_dto.update({ where: { id: user.id }, data: { verified: true } }).then(async () => {
                prisma?.$disconnect()
                return { result: SubState.USER_VERIFIED }
            })
        } if (user?.verified) {
            return { result: SubState.ALREADY_VERIFIED }
        } else {
            return { result: SubState.NOT_FOUND }
        }
    }
    export const updateStripeCustomerId = async (email: string | undefined, id: string | undefined) => {
        if (!email || !id) { throw new Error('email or id is undefined') }
        const user = await retreiveByEmail(email);
        if (user) {
            return await prisma.email_dto.update({ where: { id: user.id }, data: { stripe_customer_id: id } }).then(async (data) => {
                prisma?.$disconnect()
                return data
            })
        } else {
            return null
        }
    }
}
