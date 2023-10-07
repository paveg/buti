import { zodResolver } from "@hookform/resolvers/zod";
import { Game } from "@prisma/client";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { type ClassValue } from "clsx";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { MemberCombobox } from "~/components/combobox/memberCombobox";
import { ParlorCombobox } from "~/components/combobox/parlorCombobox";
import { cn } from "~/lib/utils";
import { Button } from "~/ui/button";
import { Calendar } from "~/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";
import { Input } from "~/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";
import { RadioGroup, RadioGroupItem } from "~/ui/radio-group";
import { Skeleton } from "~/ui/skeleton";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { SearchMemberForm } from "./searchMemberForm";

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
  game,
  sequence,
}: Props) => {
  const defaultValue = {
    gameId: game.id,
    point: 25000,
    rank: 0,
    kill: false,
    negative: false,
    sequence: sequence,
  };
  const form = useForm<z.infer<typeof GameResultFormSchema>>({
    resolver: zodResolver(GameResultFormSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof GameResultFormSchema>) {
    return console.info(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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