import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.game.findMany({
      include: {
        rule: true,
        parlor: true,
        tipResults: true,
        results: {
          include: {
            member: true,
          },
          orderBy: {
            member: {
              name: "asc",
            },
          },
        },
      },
    });
  }),
  getByYear: publicProcedure
    .input(z.object({ year: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.game.findMany({
        include: {
          rule: true,
          parlor: true,
          tipResults: true,
          results: {
            include: {
              member: true,
            },
            orderBy: {
              member: {
                name: "asc",
              },
            },
          },
        },
        where: {
          date: {
            gte: new Date(`${input.year}-01-01`),
            lt: new Date(`${input.year}-12-31`),
          },
        },
      });
    }),
});
