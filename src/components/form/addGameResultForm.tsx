import { zodResolver } from "@hookform/resolvers/zod";
import { type Game } from "@prisma/client";

import { type FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
} from "~/ui/form";

type Props = {
  children?: React.ReactNode;
  game: Game;
  sequence: number;
};

const memberObject = z.object({
  gameId: z.string(),
  memberId: z.string(),
  point: z.number(),
  rank: z.number(),
  kill: z.boolean(),
  negative: z.boolean(),
  sequence: z.number(),
});

export const GameResultFormSchema = z.object({
  member_0: memberObject,
  member_1: memberObject,
  member_2: memberObject,
  member_3: memberObject,
});

export const AddGameResultForm: FC<Props> = ({
  children,
}: Props) => {
  const form = useForm<z.infer<typeof GameResultFormSchema>>({
    resolver: zodResolver(GameResultFormSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof GameResultFormSchema>) {
    return console.info(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={void form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* {[...Array(game.headCount)].map((_, i) => {
            return <MemberSearchForm key={`member-${i}`} form={form} number={i} />;
          })} */}
        </div>
        <div className="my-4">{children}</div>
      </form>
    </Form>
  );
};
