import { z } from "zod";
import { ParlorFormSchema } from "~/components/forms/parlorForm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const parlorRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.parlor.findMany({
      include: {
        games: {
          include: {
            results: true,
          },
        },
      },
    });
  }),
  create: publicProcedure.input(ParlorFormSchema).mutation(({ ctx, input }) => {
    const newParlor = ctx.db.parlor.create({
      data: input,
    });

    return newParlor;
  }),
  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.parlor.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
