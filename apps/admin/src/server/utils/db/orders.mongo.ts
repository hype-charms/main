/* eslint-disable @typescript-eslint/no-explicit-any */
// src/server/db/client.ts
import { order_list } from "@prisma/client";
import { Context } from "../../context";

//GET
export const retreiveOrderById = async (order_ids: string[], ctx: Context): Promise<order_list[] | undefined> => {
    return await ctx.prisma?.order_list.findMany({ where: { id: { in: order_ids } } }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

export const retreiveAllOrders = async (ctx: Context): Promise<order_list[] | undefined> => {
    return await ctx.prisma?.order_list.findMany().then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

//PUT
export const updateOrdersShippingStatus = async (order_ids: string[], status: "shipped" | "delivered" | "pending" | "failed", ctx: Context) => {
    return ctx.prisma?.order_list.updateMany({ where: { id: { in: order_ids } }, data: { shipping: status as any } }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

export const updateOrdersShippingCarrier = async (order_ids: string[], carrier: "AusPost", ctx: Context) => {
    return ctx.prisma?.order_list.updateMany({ where: { id: { in: order_ids } }, data: { shipping: carrier as any } }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

export const updateOrderShippingTrackingNumber = async (order_id: string, tracking_number: string, ctx: Context) => {
    return ctx.prisma?.order_list.update({ where: { id: order_id }, data: { shipping: tracking_number as any } }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });

}



