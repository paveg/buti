import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const memberRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.member.findMany();
  }),
});
