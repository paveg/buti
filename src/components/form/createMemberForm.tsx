import { zodResolver } from "@hookform/resolvers/zod";
import { type Member } from "@prisma/client";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import type * as z from "zod";
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
import { Input } from "~/ui/input";
import { useToast } from "~/ui/use-toast";
import { api } from "~/utils/api";
import { MemberFormSchema } from "~/validations/member";

type Props = {
  members: Member[];
};

export const CreateMemberForm: FC<Props> = ({ members }: Props) => {
  const { toast } = useToast();
  const { refetch } = api.member.getAll.useQuery();
  const { mutateAsync } = api.member.create.useMutation();

  const form = useForm<z.infer<typeof MemberFormSchema>>({
    resolver: zodResolver(MemberFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof MemberFormSchema>) {
    if (members.map((member) => member.name).includes(values.name)) {
      toast({
        title: "同じ名前のメンバーが既に存在します",
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
          title: "メンバーを追加しました",
        });
      },
    });
  }

  return (
    <div className="w-[240px] my-12">
      <Form {...form}>
        <form onSubmit={void form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>メンバー名</FormLabel>
                <FormControl>
                  <Input placeholder="名前" {...field} />
                </FormControl>
                <FormDescription>
                  メンバーの名前を入力してください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">追加</Button>
        </form>
      </Form>
    </div>
  );
};
