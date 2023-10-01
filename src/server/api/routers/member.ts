import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const memberRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.member.findMany();
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.member.findUnique({
        include: {
          results: {
            include: {
              game: {
                include: {
                  results: {
                    orderBy: {
                      sequence: "asc",
                    },
                  },
                },
              },
            },
          },
        },
        where: {
          id: `${input.id}`,
        },
      });
    }),
});
