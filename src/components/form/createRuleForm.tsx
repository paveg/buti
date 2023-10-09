import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
import {
  RateStrings,
  Round,
  RoundStrings,
  Uma,
  UmaStrings,
} from "~/models/rule";
import { Button } from "~/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/ui/form";
import { RadioGroup, RadioGroupItem } from "~/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import { Switch } from "~/ui/switch";
import { useToast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { RuleFormSchema } from "~/validations/rule";

export const CreateRuleForm: FC = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RuleFormSchema>>({
    resolver: zodResolver(RuleFormSchema),
    defaultValues: {
      rate: 100,
      uma: Uma.ONETHREE,
      defaultPoint: 25000,
      referencePoint: 30000,
      tip: 2000,
      round: Round.HALFROUND,
      killBonus: true,
    },
  });
  const { data: rule } = api.rule.getBy.useQuery({
    ...form.getValues(),
  });
  const { refetch } = api.rule.getAll.useQuery();
  const { mutateAsync } = api.rule.findOrCreate.useMutation();

  function onSubmit(values: z.infer<typeof RuleFormSchema>) {
    if (rule) {
      toast({
        title: "同じルールが既に存在します",
        variant: "destructive",
      });
      return;
    }
    return mutateAsync(values, {
      onSettled: () => {
        void refetch();
      },
      onSuccess: () => {
        toast({
          title: "ルールを作成しました",
        });
      },
    });
  }

  return (
    <div className="mx-auto w-[1000px]">
      <Form {...form}>
        <form onSubmit={void form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex space-x-8">
            <FormField
              control={form.control}
              name="round"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>ゲーム種別</FormLabel>
                  <FormControl>
                    <RadioGroup
                      name="round"
                      onValueChange={(value) => field.onChange(value as Round)}
                      defaultValue={String(field.value)}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            checked={Number(field.value) === Round.QUATERROUND}
                            value={Round.QUATERROUND}
                          />
                        </FormControl>
                        <FormLabel>{RoundStrings(Round.QUATERROUND)}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            checked={Number(field.value) === Round.HALFROUND}
                            value={Round.HALFROUND}
                          />
                        </FormControl>
                        <FormLabel>{RoundStrings(Round.HALFROUND)}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uma"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>ウマ</FormLabel>
                  <FormControl>
                    <RadioGroup
                      name="uma"
                      onValueChange={(value) => field.onChange(value as Uma)}
                      defaultValue={String(field.value)}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            name="uma"
                            checked={Number(field.value) === Uma.FIVETEN}
                            value={Uma.FIVETEN}
                          />
                        </FormControl>
                        <FormLabel>{UmaStrings(Uma.FIVETEN)}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            name="uma"
                            checked={Number(field.value) === Uma.ONETWO}
                            value={Uma.ONETWO}
                          />
                        </FormControl>
                        <FormLabel>{UmaStrings(Uma.ONETWO)}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            name="uma"
                            checked={Number(field.value) === Uma.ONETHREE}
                            value={Uma.ONETHREE}
                          />
                        </FormControl>
                        <FormLabel>{UmaStrings(Uma.ONETHREE)}</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            name="uma"
                            checked={Number(field.value) === Uma.TWOTHREE}
                            value={Uma.TWOTHREE}
                          />
                        </FormControl>
                        <FormLabel>{UmaStrings(Uma.TWOTHREE)}</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>レート</FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="rate" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[0, 10, 20, 30, 50, 100].map((rate) => {
                        return (
                          <SelectItem
                            value={rate}
                            key={`select-item-rate-${rate}`}
                          >
                            {RateStrings(rate)}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>チップ</FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={String(field.value)}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="rate" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={0}>0</SelectItem>
                      <SelectItem value={500}>500</SelectItem>
                      <SelectItem value={1000}>1000</SelectItem>
                      <SelectItem value={2000}>2000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="killBonus"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center space-y-5">
                  <FormLabel>飛び賞</FormLabel>
                  <FormDescription>
                    自摸又は栄和で他家を0点未満にした際のボーナス
                  </FormDescription>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="text-center">
            <Button type="submit">ルールを作成する</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
