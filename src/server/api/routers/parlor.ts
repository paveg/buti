import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const parlorRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.parlor.findMany();
  }),
});
