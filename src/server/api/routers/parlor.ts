import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { OnlyIdObject } from "~/validations/common";
import { ParlorFormSchema } from "~/validations/parlor";

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
  deleteById: publicProcedure.input(OnlyIdObject).mutation(({ ctx, input }) => {
    return ctx.db.parlor.delete({
      where: {
        id: input.id,
      },
    });
  }),
});
