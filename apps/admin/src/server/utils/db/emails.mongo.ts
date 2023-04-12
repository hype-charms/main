import { email_dto } from "@prisma/client";
import { Context } from "../../context";

//GET
export const retreiveEmailTableByEmail = async (email: string, ctx: Context): Promise<email_dto | undefined | null> => {
    return await ctx.prisma?.email_dto.findFirst({ where: { email } }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

export const retreiveAllEmails = async (ctx: Context): Promise<email_dto[] | undefined> => {
    return ctx.prisma?.email_dto.findMany().then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

//POST
export const insertEmailListTable = async (email: string, ctx: Context): Promise<email_dto | undefined> => {
    return ctx.prisma?.email_dto.create({ data: { email } }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}