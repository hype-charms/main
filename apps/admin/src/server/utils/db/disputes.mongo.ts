import { disputes } from "@prisma/client";
import { Context } from "../../context.js";

//GET
export const retreiveAllDisputes = async (ctx: Context): Promise<disputes[] | null> => {
    return await ctx.prisma.disputes.findMany().then(async data => {
        await ctx.prisma.$disconnect()
        return data;
    })
}

export const retreiveDisputesById = async (dispute_id: string[], ctx: Context): Promise<disputes[] | null> => {
    return await ctx.prisma.disputes.findMany({ where: { id: { in: dispute_id } } }).then(async data => {
        await ctx.prisma.$disconnect();
        return data;
    })
}

//POST
export const insertDisputeTable = async (dispute: disputes, ctx: Context): Promise<disputes> => {
    return await ctx.prisma.disputes.create({ data: dispute }).then(async data => {
        await ctx.prisma.$disconnect();
        return data
    })
}

//PUT
export const upsertOrderDispute = async (dispute_id: string, dispute_obj: disputes, ctx: Context) => {
    return await ctx.prisma.disputes.upsert({ where: { id: dispute_id }, update: dispute_obj, create: dispute_obj }).then(async data => {
        await ctx.prisma.$disconnect();
        return data;
    })
}