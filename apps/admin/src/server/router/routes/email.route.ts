import { z } from "zod";
import { insertEmailListTable, retreiveAllEmails } from "../../utils/db/emails.mongo";
import { protectedDBProcedure, publicDBProcedure, router } from "../../trpc";

export const emailRouter = router({
    retrieveEmails: publicDBProcedure
        .query(async ({ ctx }) => {
            try {
                return await retreiveAllEmails(ctx);
            } catch (err) {
                console.log(err);
            }
        }),
    upsertEmails: protectedDBProcedure
        .input(
            z.object({
                email: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                await insertEmailListTable(input.email, ctx);
                return true
            } catch (err) {
                console.log(err);
                return false
            }
        })
})

export type EmailRouter = typeof emailRouter