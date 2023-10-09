import { CreateRuleForm } from "~/components/form/createRuleForm";
import { Layout } from "~/layouts";
import { RateStrings, RoundStrings, UmaStrings } from "~/models/rule";
import { Button } from "~/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";

export default function RuleIndex() {
  const { data: rules, isLoading, refetch } = api.rule.getAll.useQuery();
  const { mutateAsync } = api.rule.deleteById.useMutation();

  return (
    <Layout>
      <Table className="table-auto">
        <TableCaption>{isLoading ? "ロード中" : "ルール一覧"}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ルールID</TableHead>
            <TableHead>種別</TableHead>
            <TableHead>レート</TableHead>
            <TableHead>ウマ</TableHead>
            <TableHead>基準点</TableHead>
            <TableHead>持ち点</TableHead>
            <TableHead>チップ</TableHead>
            <TableHead>飛び賞</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            rules?.map((rule) => {
              return (
                <TableRow key={rule.id}>
                  <TableCell>{`${rule.id.slice(0, 8)}...`}</TableCell>
                  <TableCell>{RoundStrings(rule.round)}</TableCell>
                  <TableCell>{RateStrings(rule.rate)}</TableCell>
                  <TableCell>{UmaStrings(rule.uma)}</TableCell>
                  <TableCell>{rule.referencePoint}</TableCell>
                  <TableCell>{rule.defaultPoint}</TableCell>
                  <TableCell>{rule.tip}</TableCell>
                  <TableCell>{rule.killBonus ? "有" : "無"}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={rule.games.length > 0}
                      onClick={() => {
                        void mutateAsync(
                          { id: rule.id },
                          {
                            onSuccess: () => {
                              toast({
                                title: "ルールを削除しました",
                              });
                            },
                            onSettled: () => {
                              void refetch();
                            },
                          }
                        );
                      }}
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <CreateRuleForm />
    </Layout>
  );
}
