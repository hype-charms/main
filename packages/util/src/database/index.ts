export * from "./email"
export * from "./inventory"
export * from "./orders"

import { PrismaClient } from '@prisma/client';

declare global {
  // Declare a variable called `prisma` in the global scope
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Check if the `prisma` variable has already been defined and reuse it if so
const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Set the `prisma` variable on the global scope if we're not in production
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
} 

export { prisma };