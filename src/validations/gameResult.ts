import * as z from "zod";

export const CreateGameResultFormSchema = z.object({
  gameId: z.string().nonempty({ message: "ゲームを選択してください" }),
  memberId: z.string().nonempty({ message: "メンバーを選択してください" }),
  point: z.number().min(-1000000).max(10000000),
  rank: z.number().min(1).max(4),
  kill: z.boolean(),
  negative: z.boolean(),
  sequence: z.number().min(0).max(1000),
});
