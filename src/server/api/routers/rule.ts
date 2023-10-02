import { z } from "zod";
import { RuleFormSchema } from "~/components/forms/ruleForm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ruleRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.rule.findMany();
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
});
