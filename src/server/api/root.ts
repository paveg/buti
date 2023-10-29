import {
  playerRouter,
  parlorRouter,
  gameSessionRouter,
  gameRouter,
  gamePlayerRouter
} from "~/server/api/routers";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  player: playerRouter,
  parlor: parlorRouter,
  gameSession: gameSessionRouter,
  game: gameRouter,
  gamePlayer: gamePlayerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
