import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

type Props = {
  gameId: string;
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
  headCount: z.number().min(3).max(4),
  seatCost: z.number().min(0).max(1000000, {
    message: "場代は100万円以下で入力してください",
  }),
});

export const EditGameForm: FC<Props> = ({ gameId, children }: Props) => {
  const {
    data: game,
    refetch,
  } = api.game.getById.useQuery({ id: gameId });
  const queryKey = api.game.getByYear.getQueryKey({});
  const { data: parlors, isLoading: isLoadingParlors } =
    api.parlor.getAll.useQuery();
  const { data: rules, isLoading: isLoadingRules } = api.rule.getAll.useQuery();
  const { mutateAsync } = api.game.update.useMutation();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof GameFormSchema>>({
    resolver: zodResolver(GameFormSchema),
    defaultValues: { ...game },
  });

  function onSubmit(values: z.infer<typeof GameFormSchema>) {
    return mutateAsync(
      values,
      {
        onSuccess: () => {
          toast({
            title: "ゲームを更新しました",
          });
          void refetch();
          void queryClient.invalidateQueries(queryKey);
        },
        onError: (err) => {
          toast({
            variant: "destructive",
            title: "ゲームの更新に失敗しました",
            description: err.message,
          });
          console.error(err);
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={void form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ゲーム名</FormLabel>
                <div className="space-x-4 flex items-center">
                  <FormControl>
                    <Input
                      placeholder="ゲーム名"
                      className="w-[250px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>対局開始日</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[250px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ja })
                        ) : (
                          <span>日付を選択してください</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      required
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("2020-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="headCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>人数</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={String(field.value)}
                    className="flex items-baseline space-x-4"
                  >
                    <FormItem className="items-center space-y-0 space-x-2">
                      <FormControl>
                        <RadioGroupItem value={'3'} />
                      </FormControl>
                      <FormLabel>三麻</FormLabel>
                    </FormItem>
                    <FormItem className="items-center space-y-0 space-x-2">
                      <FormControl>
                        <RadioGroupItem value={'4'} />
                      </FormControl>
                      <FormLabel>四麻</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoadingParlors ? (
            <Skeleton />
          ) : (
            <FormField
              control={form.control}
              name="parlorId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>雀荘</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[250px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? parlors?.find(
                                (parlor) => parlor.id === field.value,
                              )?.name
                            : "雀荘を選択してください"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="雀荘を検索"
                          className="h-9"
                        />
                        <CommandEmpty>雀荘が見つかりません</CommandEmpty>
                        <CommandGroup>
                          {parlors?.map((parlor) => (
                            <CommandItem
                              value={parlor.id}
                              key={parlor.id}
                              onSelect={() => {
                                form.setValue("parlorId", parlor.id);
                              }}
                            >
                              {parlor.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  parlor.id === field.value
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
                  <FormDescription>対局場所</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="seatCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>場代（円）</FormLabel>
                <div className="space-x-4 flex items-center">
                  <FormControl>
                    <Input
                      placeholder="場代"
                      className="w-[250px]"
                      defaultValue={String(field.value ?? 0)}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          {isLoadingRules ? (
            <Skeleton />
          ) : (
            <FormField
              control={form.control}
              name="ruleId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>ルール</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[250px] justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? rules?.find((rule) => rule.id === field.value)?.id
                            : "ルールを選択してください"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="ルールを検索"
                          className="h-9"
                        />
                        <CommandEmpty>ルールが見つかりません</CommandEmpty>
                        <CommandGroup>
                          {rules?.map((rule) => (
                            <CommandItem
                              value={rule.id}
                              key={rule.id}
                              onSelect={() => {
                                form.setValue("ruleId", rule.id);
                              }}
                            >
                              {rule.id}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  rule.id === field.value
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
        </div>
        <div className="my-4">{children}</div>
      </form>
    </Form>
  );
};
