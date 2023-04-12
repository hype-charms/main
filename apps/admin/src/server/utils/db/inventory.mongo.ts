import { inventory } from "@prisma/client";
import { Context } from "../../context";

//GET
export const retreiveInventoryById = async (product_ids: string[], ctx: Context): Promise<inventory[] | undefined> => {
    return await ctx.prisma?.inventory.findMany({ where: { id: { in: product_ids } } }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

export const retreiveAllInventory = async (ctx: Context): Promise<inventory[] | undefined> => {
    return await ctx.prisma?.inventory.findMany().then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

//POST
export const insertInventoryTable = async (inventory: inventory, ctx: Context): Promise<inventory | undefined> => {
    return await ctx.prisma?.inventory.create({ data: inventory }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

//PUT
export const upsertInventoryTable = async (product_id: string, inventory_obj: inventory, ctx: Context) => {
    await ctx.prisma?.inventory.upsert({ where: { id: product_id }, update: inventory_obj, create: inventory_obj }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

export const upsertCurrentStock = async (product_id: string, current_stock: number, ctx: Context) => {
    await ctx.prisma?.inventory.upsert({ where: { id: product_id }, update: { current_stock }, create: { id: product_id, current_stock, name: '', ordered_stock: 0 } }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
}

export const upsertOrderedStock = async (product_id: string, ordered_stock: number, ctx: Context) => {
    await ctx.prisma?.inventory.upsert({ where: { id: product_id }, update: { ordered_stock }, create: { id: product_id, ordered_stock, name: '', current_stock: 0 } }).then((data) => {
        ctx.prisma?.$disconnect()
        return data
    });
} 