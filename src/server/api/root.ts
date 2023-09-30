import { gameRouter } from "~/server/api/routers/game";
import { memberRouter } from "~/server/api/routers/member";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  member: memberRouter,
  game: gameRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
