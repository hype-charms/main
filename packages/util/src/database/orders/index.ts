/* eslint-disable @typescript-eslint/no-explicit-any */
// src/server/db/client.ts
import { order_dto } from "@prisma/client";
import { prisma } from "../index"

export namespace orders {
    //GET
    export const retreiveOrderById = async (order_ids: string[],): Promise<order_dto[] | undefined> => {
        return await prisma?.order_dto.findMany({ where: { id: { in: order_ids } } }).then((data) => {
            prisma?.$disconnect()
            return data
        });
    }

    export const retreiveAllOrders = async (): Promise<order_dto[] | undefined> => {
        return await prisma?.order_dto.findMany().then((data) => {
            prisma?.$disconnect()
            return data
        });
    }

    //PUT
    // export const updateOrdersShippingStatus = async (order_ids: string[], status: "shipped" | "delivered" | "pending" | "failed", ) => {
    //     return prisma?.order_dto.updateMany({ where: { id: { in: order_ids } }, data: { shipping: status as any } }).then((data) => {
    //         prisma?.$disconnect()
    //         return data
    //     }); 
    // }

    // export const updateOrdersShippingCarrier = async (order_ids: string[], carrier: "AusPost", ) => {
    //     return prisma?.order_dto.updateMany({ where: { id: { in: order_ids } }, data: { shipping: carrier as any } }).then((data) => {
    //         prisma?.$disconnect()
    //         return data
    //     });
    // }

    export const updateOrderShippingTrackingNumber = async (order_id: string, tracking_number: string,) => {
        return prisma?.order_dto.update({ where: { id: order_id }, data: { shipping: tracking_number as any } }).then((data) => {
            prisma?.$disconnect()
            return data
        });

    }

}



