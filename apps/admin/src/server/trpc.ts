import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

const usePrisma = t.middleware(async ({ next, ctx }) => {
    ctx.prisma?.$connect();
    return next();
})

const isAuthed = t.middleware(async ({ next, ctx }) => {
    if (!ctx.session) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next();
});

export const protectedDBProcedure = t.procedure.use(isAuthed).use(usePrisma);
export const publicDBProcedure = t.procedure.use(usePrisma);
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
export const mergeRouters = t.mergeRouters;