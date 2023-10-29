import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const playerRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.player.findMany()
  }),
  getById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.db.player.findUnique({
      where: {
        id: input.id
      },
      include: {
        gamePlayers: true
      }
    })
  })
})
