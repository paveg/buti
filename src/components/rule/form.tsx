import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Round, Uma } from "~/models/rule";
import { api } from "~/utils/api";

export const RuleForm: FC = () => {
  const formSchema = z.object({
    rate: z
      .number({
        required_error: "レートを選択してください",
        required: true,
      })
      .nonnegative(),
    uma: z.number().min(0).max(3),
    defaultPoint: z.number(),
    referencePoint: z.number(),
    tip: z.number(),
    round: z.number().min(0).max(1),
    killButton: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: 50,
      uma: Uma.ONETHREE,
      defaultPoint: 25000,
      referencePoint: 30000,
      tip: 2000,
      round: Round.HALFROUND,
      killBonus: true,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    return api.rule.createRule.useQuery(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rate</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="rate" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={0}>ノーレート</SelectItem>
                  <SelectItem value={10}>テンイチ</SelectItem>
                  <SelectItem value={20}>テンニ</SelectItem>
                  <SelectItem value={30}>テンサン</SelectItem>
                  <SelectItem value={50}>テンゴ</SelectItem>
                  <SelectItem value={100}>テンピン</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">ルールを作成する</Button>
      </form>
    </Form>
  );
};
