import { PrismaClient } from '@prisma/client';
import { env } from '../../env/server.mjs';

declare global {
  // Declare a variable called `prisma` in the global scope
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Check if the `prisma` variable has already been defined and reuse it if so
const prisma = global.prisma || new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Set the `prisma` variable on the global scope if we're not in production
if (env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };