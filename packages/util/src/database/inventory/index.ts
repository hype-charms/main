import { inventory_dto } from "@prisma/client";
import { prisma } from "../index"
//GET

export namespace inventory {

    export const retreiveInventoryById = async (product_ids: string[]): Promise<inventory_dto[] | undefined> => {
        return await prisma?.inventory_dto.findMany({ where: { id: { in: product_ids } } }).then((data) => {
            prisma?.$disconnect()
            return data
        });
    }

    export const retreiveAllInventory = async (): Promise<inventory_dto[] | undefined> => {
        return await prisma?.inventory_dto.findMany().then((data) => {
            prisma?.$disconnect()
            return data
        });
    }

    //POST
    export const insertInventoryTable = async (inventory: inventory_dto,): Promise<inventory_dto | undefined> => {
        return await prisma?.inventory_dto.create({ data: inventory }).then((data) => {
            prisma?.$disconnect()
            return data
        });
    }

    //PUT
    export const upsertInventoryTable = async (product_id: string, inventory_obj: inventory_dto,) => {
        await prisma?.inventory_dto.upsert({ where: { id: product_id }, update: inventory_obj, create: inventory_obj }).then((data) => {
            prisma?.$disconnect()
            return data
        });
    }

    export const upsertCurrentStock = async (product_id: string, current_stock: number,) => {
        await prisma?.inventory_dto.upsert({ where: { id: product_id }, update: { current_stock }, create: { id: product_id, current_stock, name: '', ordered_stock: 0 } }).then((data) => {
            prisma?.$disconnect()
            return data
        });
    }

    export const upsertOrderedStock = async (product_id: string, ordered_stock: number,) => {
        await prisma?.inventory_dto.upsert({ where: { id: product_id }, update: { ordered_stock }, create: { id: product_id, ordered_stock, name: '', current_stock: 0 } }).then((data) => {
            prisma?.$disconnect()
            return data
        });
    }
} 