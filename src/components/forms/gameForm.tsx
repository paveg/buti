import { zodResolver } from "@hookform/resolvers/zod";
import { Game } from "@prisma/client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import { api } from "~/utils/api";
import { Input } from "../ui/input";
import { toast } from "../ui/use-toast";

type Props = {
  game: Game;
  children?: React.ReactNode;
};

export const GameFormSchema = z.object({
  id: z.string({ required_error: "ゲームIDが見つかりません" }),
  name: z
    .string()
    .nonempty({ message: "ゲーム名を入力してください" })
    .max(80, { message: "ゲーム名は80文字以内で入力してください" }),
  date: z.date(),
  parlorId: z.string(),
  ruleId: z.string(),
  headCount: z.number(),
  seatCost: z.number(),
});

export const GameForm: FC<Props> = ({ game, children }: Props) => {
  const { mutateAsync } = api.game.update.useMutation();
  const form = useForm<z.infer<typeof GameFormSchema>>({
    resolver: zodResolver(GameFormSchema),
    defaultValues: { ...game },
  });

  function onSubmit(values: z.infer<typeof GameFormSchema>) {
    return mutateAsync(
      { id: game.id, ...values },
      {
        onSuccess: (res) => {
          toast({
            title: "ゲームを更新しました",
          });
        },
        onError: (err) => {
          toast({
            variant: "destructive",
            title: "ゲームの更新に失敗しました",
            description: err.message,
          });
          console.error(err);
        },
        onSettled: () => {},
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          className="my-4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ゲーム名</FormLabel>
              <FormControl>
                <Input placeholder="ゲーム名" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="my-4">{children}</div>
      </form>
    </Form>
  );
};
