import { Rule } from "@prisma/client";
import { useState } from "react";
import { RuleForm } from "~/components/rule/form";
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
import { api } from "~/utils/api";
import { RoundStrings, UmaStrings } from "../../models/rule";

export default function () {
  const { data: rules, isLoading } = api.rule.getAll.useQuery();
  const [newLine, setNewLine] = useState<Rule[]>([]);

  return (
    <>
      <div className="container">
        <h1>Rule</h1>
        <Table className="mx-auto">
          <TableCaption>{isLoading ? "ロード中" : "ルール一覧"}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ルールID</TableHead>
              <TableHead>レート</TableHead>
              <TableHead>ウマ</TableHead>
              <TableHead>チップ</TableHead>
              <TableHead>基準点</TableHead>
              <TableHead>持ち点</TableHead>
              <TableHead>ゲーム種別</TableHead>
              <TableHead>トビ賞</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!isLoading &&
              rules?.map((rule) => {
                return (
                  <TableRow key={rule.id}>
                    <TableCell className="w-[100px]">{rule.id}</TableCell>
                    <TableCell className="w-[100px]">{rule.rate}</TableCell>
                    <TableCell className="w-[100px]">
                      {UmaStrings(rule.uma)}
                    </TableCell>
                    <TableCell className="w-[100px]">{rule.tip}</TableCell>
                    <TableCell className="w-[100px]">
                      {rule.referencePoint}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      {rule.defaultPoint}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      {RoundStrings(rule.round)}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      {rule.killBonus ? "有" : "無"}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <RuleForm />
      </div>
    </>
  );
}
