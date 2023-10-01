import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ruleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.rule.findMany();
  }),
  getBy: publicProcedure
    .input(
      z.object({
        rate: z.number(),
        uma: z.number(),
        defaultPoint: z.number(),
        referencePoint: z.number(),
        tip: z.number(),
        round: z.number(),
        killBonus: z.boolean(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.rule.findFirst({
        where: input,
      });
    }),
  findOrCreate: publicProcedure
    .input(
      z.object({
        rate: z.number(),
        uma: z.number(),
        defaultPoint: z.number(),
        referencePoint: z.number(),
        tip: z.number(),
        round: z.number(),
        killBonus: z.boolean(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const newRule = ctx.db.rule.create({
        data: input,
      });

      return newRule;
    }),
});
