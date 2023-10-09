import {
  gameRouter,
  memberRouter,
  parlorRouter,
  ruleRouter,
  gameResultRouter
} from "~/server/api/routers";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  member: memberRouter,
  game: gameRouter,
  rule: ruleRouter,
  parlor: parlorRouter,
  gameResult: gameResultRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
