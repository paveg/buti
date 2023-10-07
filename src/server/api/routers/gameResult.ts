import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const gameResultRouter = createTRPCRouter({
  create: publicProcedure.input(z.object({})).mutation(({ ctx, input }) => {}),
});
