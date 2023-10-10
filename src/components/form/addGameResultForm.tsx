import { zodResolver } from "@hookform/resolvers/zod";
import { type Member } from "@prisma/client";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { type FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "~/lib/utils";
import { type GameWithResults } from "~/types/game";
import { Button } from "~/ui/button";
import { Checkbox } from "~/ui/checkbox";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";
import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";
import { Skeleton } from "~/ui/skeleton";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { CreateGameResultFormSchema } from "~/validations/gameResult";

type Props = {
  children?: React.ReactNode;
  game: GameWithResults;
};
export const AddGameResultForm: FC<Props> = ({ children, game }: Props) => {
  const seq = game.results.length / game.headCount;
  const queryKey = api.game.getById.getQueryKey({ id: game.id });
  const queryClient = useQueryClient();
  const { data: members, isLoading } = api.member.getAll.useQuery();
  const { mutateAsync } = api.gameResult.createMany.useMutation();
  const schema = z.object({
    sequence: z.number(),
    gameResults: z.array(CreateGameResultFormSchema),
  });
  type ZGameResult = z.infer<typeof schema>["gameResults"][number];
  const gameMemberIds = game.results.map((r) => r.memberId);
  let gameMembers: Member[] = [];
  if (!isLoading) {
    gameMembers =
      members?.filter((m) => gameMemberIds.includes(m.id)) ?? ([] as Member[]);
  }
  const gms: Member[] = gameMembers.length > 0 ? gameMembers : members ?? [];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const resultsInitial: ZGameResult[] = [...Array(game.headCount)].map(
    (_, i) => {
      return {
        gameId: game.id,
        memberId: "",
        point: 0,
        rank: i + 1,
        kill: false,
        negative: false,
        sequence: seq,
      };
    }
  );
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      sequence: game.results.length / game.headCount,
      gameResults: resultsInitial,
    },
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    name: "gameResults",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof schema>) {
    return mutateAsync(data, {
      onError: (error) => {
        toast({
          title: error.message,
        });
      },
      onSuccess: () => {
        void queryClient.invalidateQueries(queryKey);
      },
    });
  }
  console.info(form.getValues());

  return (
    <>
      <h2>{seq + 1}局</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => {
            return (
              <div className="mt-4 rounded-lg md:mt-6" key={field.id}>
                {isLoading ? (
                  <Skeleton className="ml-auto h-8 w-5/6 md:ml-0 md:w-3/5" />
                ) : (
                  <FormField
                    control={form.control}
                    name={`gameResults.${index}.memberId` as const}
                    render={({ field }) => (
                      <FormItem className="flex md:flex-col">
                        <FormLabel className="pt-4 md:pt-0">
                          {index + 1}位
                        </FormLabel>
                        <Popover classN>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "ml-auto w-5/6 justify-between md:ml-0 md:w-3/5",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? gms.find(
                                      (member) => member.id === field.value
                                    )?.name
                                  : "メンバーを選択してください"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-10/11 p-0">
                            <Command>
                              <CommandInput
                                placeholder="メンバーを検索"
                                className="h-9"
                              />
                              <CommandEmpty>
                                メンバーが見つかりません
                              </CommandEmpty>
                              <CommandGroup>
                                {gms
                                  .filter(
                                    (m) =>
                                      !form
                                        .getValues()
                                        .gameResults.map((r) => r.memberId)
                                        .includes(m.id)
                                  )
                                  .map((member) => (
                                    <CommandItem
                                      value={member.id}
                                      key={member.id}
                                      onSelect={() => {
                                        console.info(member.id);
                                        form.setValue(
                                          `gameResults.${index}.memberId`,
                                          member.id
                                        );
                                      }}
                                    >
                                      {member.name}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          member.id === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  name={`gameResults.${index}.point` as const}
                  key={field.id}
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex md:flex-col">
                        <FormLabel className="pt-5">
                          <>得点</>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            className="ml-auto w-2/5 justify-between md:ml-0 md:w-3/5"
                            placeholder="得点"
                            {...field}
                            onChange={(e) => {
                              return field.onChange(Number(e.target.value));
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="space-x-1 pt-2">
                          <Checkbox
                            className="ml-2"
                            id={`kill-${index}`}
                            onCheckedChange={(checked) => {
                              form.setValue(
                                `gameResults.${index}.kill`,
                                checked
                              );
                            }}
                          />
                          <Label htmlFor={`kill-${index}`}>飛び賞（+10）</Label>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              </div>
            );
          })}
          <div className="my-8">{children}</div>
        </form>
      </Form>
    </>
  );
};
