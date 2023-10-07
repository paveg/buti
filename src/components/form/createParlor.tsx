import { zodResolver } from "@hookform/resolvers/zod";
import { Parlor } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { ParlorFormSchema } from "~/validations/parlor";

type Props = {
  parlors: Parlor[];
};

export const CreateParlorForm: FC<Props> = ({ parlors }: Props) => {
  const { toast } = useToast();
  const { refetch } = api.parlor.getAll.useQuery();
  const { mutateAsync } = api.parlor.create.useMutation();

  const form = useForm<z.infer<typeof ParlorFormSchema>>({
    resolver: zodResolver(ParlorFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof ParlorFormSchema>) {
    if (parlors.map((parlor) => parlor.name).includes(values.name)) {
      toast({
        title: "同じ名前の雀荘が既に存在します",
        variant: "destructive",
      });
      return;
    }

    return mutateAsync(values, {
      onSettled: () => {
        refetch();
      },
      onSuccess: () => {
        toast({
          title: "雀荘を追加しました",
        });
      },
    });
  }

  return (
    <div className="w-[240px] my-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>雀荘名</FormLabel>
                <FormControl>
                  <Input placeholder="雀荘名" {...field} />
                </FormControl>
                <FormDescription>
                  対局を行う雀荘の名前を入力してください
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
