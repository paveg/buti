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
});
