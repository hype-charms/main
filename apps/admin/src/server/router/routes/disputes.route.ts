import { z } from "zod";
import { retreiveAllDisputes, retreiveDisputesById, upsertOrderDispute } from "../../utils/db/disputes.mongo";
import { protectedDBProcedure, publicProcedure, router } from "../../trpc";

export const disputesRouter = router({
    retrieveDisputesById: publicProcedure.input(z.array(z.string()))
        .query(async ({ ctx, input }) => {
            try {
                return await retreiveDisputesById(input, ctx);
            } catch (err) {
                console.log(err);
                return null;
            }
        }),
    retrieveDisputes: publicProcedure
        .query(async ({ ctx }) => {
            try {
                return await retreiveAllDisputes(ctx);
            } catch (err) {
                console.log(err);
                return null;
            }
        }),
    upsertDispute: protectedDBProcedure
        .input(z.object({
            dispute_id: z.string(),
            dispute: z.any()
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                await upsertOrderDispute(input.dispute_id, input.dispute, ctx);
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        })
})

export type DisputesRouter = typeof disputesRouter