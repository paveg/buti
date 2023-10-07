import { Skeleton } from "../../ui/skeleton";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import type { UseFormReturn } from "react-hook-form";
import * as z from "zod";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/ui/popover";
import { useToast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { cn } from "../../lib/utils";
import { Button } from "../../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../ui/command";
import { GameResultFormSchema } from "./addGameResultForm";

type Props = {
  form: UseFormReturn<z.infer<typeof GameResultFormSchema>>;
  number: number;
};

export const MemberSearchForm = ({ form, number }: Props) => {
  const { data: members, isLoading } = api.member.getAll.useQuery();

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <FormField
          control={form.control}
          name={"member"}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>メンバー{number + 1}</FormLabel>
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
                        ? members.find((member) => member.id === field.value)
                            ?.name
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
                    <CommandEmpty>メンバーが見つかりません</CommandEmpty>
                    <CommandGroup>
                      {members.map((member) => (
                        <CommandItem
                          value={member.id}
                          key={member.id}
                          onSelect={() => {
                            form.setValue("memberId", member.id);
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
    </>
  );
};
