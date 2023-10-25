import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const playerRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.player.findMany()
  })
})
