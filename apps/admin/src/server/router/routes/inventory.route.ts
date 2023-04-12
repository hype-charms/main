import { z } from "zod";
import { insertInventoryTable, retreiveAllInventory, retreiveInventoryById, upsertCurrentStock, upsertInventoryTable, upsertOrderedStock } from "../../utils/db/inventory.mongo";
import { protectedDBProcedure, publicDBProcedure, router } from "../../trpc";

export const inventoryRouter = router({
    retrieveInventory: publicDBProcedure
        .query(async ({ ctx }) => {
            try {
                return await retreiveAllInventory(ctx);
            } catch (err) {
                console.log(err);
                return null;
            }
        }),
    retreiveInventoryById: protectedDBProcedure.input(z.array(z.string()))
        .query(async ({ ctx, input }) => {
            try {
                return await retreiveInventoryById(input, ctx)
            } catch (err) {
                console.log(err);
            }
        }),
    insertInventory: protectedDBProcedure
        .input(z.object({
            product_id: z.string(),
            inventory: z.object({
                id: z.string(),
                name: z.string(),
                current_stock: z.number(),
                ordered_stock: z.number()
            })
        })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                await insertInventoryTable(input.inventory, ctx);
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        }),
    upsertInventory: protectedDBProcedure
        .input(z.object({
            product_id: z.string(),
            inventory: z.object({
                id: z.string(),
                name: z.string(),
                current_stock: z.number(),
                ordered_stock: z.number()
            })
        })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                await upsertInventoryTable(input.product_id, input.inventory, ctx);
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        }),
    upsertCurrentStock: protectedDBProcedure
        .input(z.object({
            product_id: z.string(),
            current_stock: z.number()
        })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                await upsertCurrentStock(input.product_id, input.current_stock, ctx);
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        }),
    upsertOrderedStock: protectedDBProcedure
        .input(z.object({
            product_id: z.string(),
            ordered_stock: z.number()
        })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                await upsertOrderedStock(input.product_id, input.ordered_stock, ctx);
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        })
})

export type InventoryRouter = typeof inventoryRouter