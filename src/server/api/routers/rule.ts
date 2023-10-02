import { z } from "zod";
import { RuleFormSchema } from "~/components/forms/ruleForm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ruleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.rule.findMany({
      include: {
        games: true,
      },
    });
  }),
  getBy: publicProcedure.input(RuleFormSchema).query(({ ctx, input }) => {
    return ctx.db.rule.findFirst({
      where: input,
    });
  }),
  findOrCreate: publicProcedure
    .input(RuleFormSchema)
    .mutation(({ ctx, input }) => {
      const newRule = ctx.db.rule.create({
        data: input,
      });

      return newRule;
    }),
  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.rule.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
