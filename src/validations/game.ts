import * as z from "zod";
import { OnlyIdObject } from "./common";

export const OnlyYearObject = z.object({ year: z.number().optional() });
export const CreateGameFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "ゲーム名を入力してください" })
    .max(80, { message: "ゲーム名は80文字以内で入力してください" }),
  date: z.date(),
  parlorId: z.string().nonempty({ message: "雀荘を選択してください" }),
  ruleId: z.string().nonempty({ message: "ルールを選択してください" }),
  headCount: z.number().min(3).max(4),
  seatCost: z
    .number()
    .nonnegative({ message: "0以上の数値を入力してください" })
    .max(1000000, { message: "1000000万円以下の数値を入力してください" }),
});

export const EditGameFormSchema = CreateGameFormSchema.merge(OnlyIdObject);
