import { z } from "zod";
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
  }),
  getById: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
    return ctx.db.gameSession.findUnique({
      where: {
        id: input.id
      },
      include: {
        rule: true,
        parlor: true,
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
        }
      }
    })
  }),
})
