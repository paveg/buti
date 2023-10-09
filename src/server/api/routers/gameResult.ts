import * as trpc from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CreateGameResultFormSchemas } from "~/validations/gameResult";

function negative(n: number) {
  return n < 0;
}

export const gameResultRouter = createTRPCRouter({
  createMany: publicProcedure.input(CreateGameResultFormSchemas).mutation(({ ctx, input }) => {
    const score = input.gameResults.reduce((acc, result) => {
      return acc + result.point
    }, 0)
    if (score !== 100000) {
      throw new trpc.TRPCError({
        code: 'BAD_REQUEST',
        message: '合計得点が一致しません'
      })
    }

    const records = input.gameResults.map(result => {
      return {
        gameId: result.gameId,
        memberId: result.memberId,
        point: result.point,
        rank: result.rank,
        kill: result.kill,
        negative: negative(result.point),
        sequence: input.sequence
      }
    });
    console.log(records)

    // This should be failed because sqlite does not support bulk insert as this query
    const newRecords = ctx.db.gameResult.createMany({
      data: records,
    })

    return newRecords
  }),
});
