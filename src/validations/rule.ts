import * as z from "zod";
import { Round, Uma } from "~/models/rule";

export const RuleFormSchema = z.object({
  rate: z.number().nonnegative({ message: "0以上の数値を入力してください" }),
  uma: z.number().min(Uma.FIVETEN).max(Uma.TWOTHREE),
  defaultPoint: z
    .number()
    .nonnegative({ message: "0以上の数値を入力してください" }),
  referencePoint: z
    .number()
    .nonnegative({ message: "0以上の数値を入力してください" }),
  tip: z.number().nonnegative({ message: "0以上の数値を入力してください" }),
  round: z.number().min(Round.QUATERROUND).max(Round.FULLROUND),
  killBonus: z.boolean(),
});
