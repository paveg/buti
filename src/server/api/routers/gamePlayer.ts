import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gamePlayerRouter = createTRPCRouter({
  listByGameId: publicProcedure.input(z.object({ gameId: z.string() })).query(({ ctx, input }) => {
    return ctx.db.gamePlayer.findMany(
      {
        where: {
          gameId: input.gameId
        },
        include: {
          player: true
        }
      }
    )
  }),
})
