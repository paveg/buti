import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.game.findMany({
      include: {
        parlor: true,
        results: {
          include: {
            member: true,
          },
        },
      },
    });
  }),
});
