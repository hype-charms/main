// src/server/router/index.ts
import { inventoryRouter } from './routes/inventory.route'
import { emailRouter } from './routes/email.route'
import { disputesRouter } from './routes/disputes.route';
import { ordersRouter } from './routes/orders.route'
import { router } from '../trpc';

export const appRouter = router({
  inventory: inventoryRouter,
  emails: emailRouter,
  disputes: disputesRouter,
  orders: ordersRouter,
});

export type AppRouter = typeof appRouter;