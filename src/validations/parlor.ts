import * as z from "zod";

export const ParlorFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "雀荘名を入力してください" })
    .max(80, { message: "雀荘名は80文字以内で入力してください" }),
});
