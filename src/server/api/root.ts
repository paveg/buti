import { gameRouter } from "~/server/api/routers/game";
import { memberRouter } from "~/server/api/routers/member";
import { createTRPCRouter } from "~/server/api/trpc";
import { ruleRouter } from "./routers/rule";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  member: memberRouter,
  game: gameRouter,
  rule: ruleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
