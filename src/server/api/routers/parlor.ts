import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const parlorRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.parlor.findMany({
      include: {
        sessions: {
          include: {
            games: true
          }
        }
      }
    })
  })
})
