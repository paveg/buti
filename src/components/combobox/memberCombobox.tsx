import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~/ui/popover";
import { Skeleton } from "~/ui/skeleton";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";

const FormSchema = z.object({
  member: z.string({
    required_error: "Please select a member.",
  }),
});

export function MemberCombobox() {
  const { data: members, isLoading } = api.member.getAll.useQuery();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="member"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>メンバー</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[240px] justify-between",
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
                    <PopoverContent className="w-[250px] p-0">
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
                              key={member.name}
                              onSelect={() => {
                                form.setValue("member", member.id);
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
                  <FormDescription>TODO</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </>
  );
}
