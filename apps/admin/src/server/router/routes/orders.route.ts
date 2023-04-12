import { z } from "zod";
import { protectedDBProcedure, publicDBProcedure, router } from "../../trpc";
import { retreiveAllOrders, retreiveOrderById, updateOrderShippingTrackingNumber, updateOrdersShippingCarrier, updateOrdersShippingStatus, } from "../../utils/db/orders.mongo";

export const ordersRouter = router({
    retrieveOrder: publicDBProcedure.query(async ({ ctx }) => {
        return await retreiveAllOrders(ctx);
    }),
    retrieveOrdersById: publicDBProcedure.input(String)
        .query(async ({ input, ctx }) => {
            try {
                return await retreiveOrderById([input], ctx)
            } catch (err) {
                console.log(err);
                return null;
            }
        }),
    upsertOrderStatus: protectedDBProcedure
        .input(z.object({
            order_ids: z.array(z.string()),
            shipping_status: z.enum([
                'shipped',
                'delivered',
                'pending',
                'failed',
            ])
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                await updateOrdersShippingStatus(input.order_ids, input.shipping_status, ctx);
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        }),
    updateOrderCarrier: protectedDBProcedure
        .input(z.object({
            order_ids: z.array(z.string()),
            carrier: z.enum(['AusPost'])
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                await updateOrdersShippingCarrier(input.order_ids, input.carrier, ctx);
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        }),
    updateOrderTrackingNumber: protectedDBProcedure
        .input(z.object({
            order_id: z.string(),
            tracking_number: z.string()
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                await updateOrderShippingTrackingNumber(input.order_id, input.tracking_number, ctx);
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        }),
})

export type OrdersRouter = typeof ordersRouter