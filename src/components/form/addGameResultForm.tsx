import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { type FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { cn } from "~/lib/utils";
import { Button } from "~/ui/button";
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
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";
import { Skeleton } from "~/ui/skeleton";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { CreateGameResultFormSchema } from "~/validations/gameResult";

type Props = {
  children?: React.ReactNode;
  game: Game;
  sequence: number;
};
export const AddGameResultForm: FC<Props> = ({
  children,
  game,
}: Props) => {
  const { data: members, isLoading } = api.member.getAll.useQuery();
  const { mutateAsync } = api.gameResult.createMany.useMutation();
  const schema = z.object({
    sequence: z.number(),
    gameResults: z.array(CreateGameResultFormSchema),
  });
  type ZGameResult = z.infer<typeof schema>["gameResults"][number];

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
      };
    },
  );
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      sequence: 1,
      gameResults: resultsInitial,
    },
    mode: "onChange",
  });

  const { fields } = useFieldArray({
    name: "gameResults",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof schema>) {
    console.info('data: ', data)
    const score = data.gameResults.reduce((acc, result) => {
      return acc + result.point
    }, 0)
    console.info(score)
    return mutateAsync(data, {
      onError: (error) => {
        toast({
          title: error.message
        })
      }
    })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="my-4 flex space-x-6 items-end">
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <FormField
                    control={form.control}
                    name={`gameResults.${index}.memberId` as const}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>{index + 1}位</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-[230px] justify-between",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? members.find(
                                      (member) => member.id === field.value,
                                    )?.name
                                  : "メンバーを選択してください"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput
                                placeholder="メンバーを検索"
                                className="h-9"
                              />
                              <CommandEmpty>
                                メンバーが見つかりません
                              </CommandEmpty>
                              <CommandGroup>
                                {members.map((member) => (
                                  <CommandItem
                                    value={member.id}
                                    key={member.id}
                                    onSelect={() => {
                                      form.setValue(
                                        `gameResults.${index}.memberId`,
                                        member.id,
                                      );
                                    }}
                                  >
                                    {member.name}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        member.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
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
                      <FormItem>
                        <FormLabel>得点</FormLabel>
                        <FormControl>
                          <Input
                            className="w-[200px]"
                            placeholder="得点"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            );
          })}
          <div className="my-4">{children}</div>
        </form>
      </Form>
    </>
  );
};
