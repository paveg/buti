import * as z from "zod";

export const MemberFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "メンバー名を入力してください" })
    .max(80, { message: "名前は80文字以内で入力してください" }),
});
