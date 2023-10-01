import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ruleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.rule.findMany();
  }),
  createRule: publicProcedure
    .input(
      z.object({
        rate: z.number(),
        uma: z.number().min(0).max(3),
        defaultPoint: z.number(),
        referencePoint: z.number(),
        tip: z.number(),
        round: z.number().min(0).max(1),
        killButton: z.boolean(),
      }),
    )
    .query(({ ctx, input }) => {
      const newRule = ctx.db.rule.create({
        data: input,
      });

      return newRule;
    }),
});
