/* eslint-disable @typescript-eslint/no-unused-vars */
// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getServerAuthSession } from "./utils/get-server-auth-session";
import { stripe } from '../shared-util/context/stripe'
import { sendgrid } from '../shared-util/context/sendgrid'
import { prisma } from '../shared-util/context/client'

export const createContext = async (opts: trpcNext.CreateNextContextOptions) => {
  const session = await getServerAuthSession(opts);
  return {
    session,
    stripe,
    prisma,
    sendgrid,
  }
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
