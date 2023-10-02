import { z } from "zod";
import { GameFormSchema } from "~/components/forms/gameForm";
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
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.game.findFirst({
        where: {
          id: input.id,
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
  update: publicProcedure.input(GameFormSchema).mutation(({ ctx, input }) => {
    return ctx.db.game.update({
      where: {
        id: input.id,
      },
      data: input,
    });
  }),
});
