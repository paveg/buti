import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const gameSessionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.gameSession.findMany({
      include: {
        rule: true,
        games: {
          include: {
            players: {
              include: {
                player: true
              }
            }
          },
          orderBy: [{
            sequence: 'asc'
          }]
        },
      }
    })
  })
})
