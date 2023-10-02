import { Rule } from "@prisma/client";
import { useState } from "react";
import { RuleForm } from "~/components/forms/ruleForm";
import { Layout } from "~/components/layout";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { toast } from "~/components/ui/use-toast";
import { RateStrings, RoundStrings, UmaStrings } from "~/models/rule";
import { api } from "~/utils/api";

export default function () {
  const { data: rules, isLoading, refetch } = api.rule.getAll.useQuery();
  const { mutateAsync } = api.rule.deleteById.useMutation();

  return (
    <Layout>
      <div className="container mx-auto m-4">
        <Table className="mx-auto my-8">
          <TableCaption>{isLoading ? "ロード中" : "ルール一覧"}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ルールID</TableHead>
              <TableHead>ゲーム種別</TableHead>
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
                    <TableCell className="w-[100px]">{rule.id}</TableCell>
                    <TableCell className="w-[100px]">
                      {RoundStrings(rule.round)}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      {RateStrings(rule.rate)}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      {UmaStrings(rule.uma)}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      {rule.referencePoint}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      {rule.defaultPoint}
                    </TableCell>
                    <TableCell className="w-[100px]">{rule.tip}</TableCell>
                    <TableCell className="w-[100px]">
                      {rule.killBonus ? "有" : "無"}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={rule.games.length > 0}
                        onClick={() => {
                          mutateAsync(
                            { id: rule.id },
                            {
                              onSuccess: () => {
                                toast({
                                  title: "ルールを削除しました",
                                });
                              },
                              onSettled: () => {
                                refetch();
                              },
                            },
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
        <RuleForm />
      </div>
    </Layout>
  );
}
