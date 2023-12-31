import Link from "next/link";
import { CreateMemberForm } from "~/components/form/createMemberForm";
import { Layout } from "~/layouts";
import { Button } from "~/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";
import { toast } from "~/ui/use-toast";
import { api } from "~/utils/api";

// eslint-disable-next-line import/no-anonymous-default-export
export default function MemberIndex() {
  const { data: members, isLoading, refetch } = api.member.getAll.useQuery();
  const { mutateAsync } = api.member.deleteById.useMutation();

  return (
    <Layout>
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">名前</TableHead>
            <TableHead className="text-center">対局数</TableHead>
            <TableHead className="text-center">平均順位</TableHead>
            <TableHead className="text-center">連対率</TableHead>
            <TableHead className="hidden text-center md:table-cell">
              ラス率
            </TableHead>
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            members?.map((member) => {
              const matchCount = member.results.length;
              const rankedCount = member.results.reduce((acc, result) => {
                switch (result.rank) {
                  case 1:
                    return acc + 1;
                  case 2:
                    return acc + 2;
                  case 3:
                    return acc + 3;
                  case 4:
                    return acc + 4;
                  default:
                    throw new Error("invalid rank");
                }
              }, 0);
              const winRate =
                (member.results.reduce((acc, result) => {
                  if (result.rank === 1 || result.rank === 2) {
                    return acc + 1;
                  }
                  return acc;
                }, 0) /
                  matchCount) *
                100;
              const lastPlaceRate =
                (member.results.reduce((acc, result) => {
                  if (result.rank === 4) {
                    return acc + 1;
                  }
                  return acc;
                }, 0) /
                  matchCount) *
                100;
              const avgRank = rankedCount / matchCount;
              return (
                <TableRow key={member.id}>
                  <TableCell className="text-center">{member.name}</TableCell>
                  <TableCell className="text-center">{matchCount}</TableCell>
                  <TableCell className="text-center">
                    {isNaN(avgRank) ? "-" : `${avgRank.toFixed(2)}位`}
                  </TableCell>
                  <TableCell className="text-center">
                    {isNaN(winRate) ? "-" : `${winRate.toFixed(2)}%`}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {isNaN(lastPlaceRate)
                      ? "-"
                      : `${lastPlaceRate.toFixed(2)}%`}
                  </TableCell>
                  <TableCell className="">
                    <div className="flex space-x-2 md:space-x-4">
                      <Button size="icon" asChild>
                        <Link href={`/members/${member.id}`}>詳細</Link>
                      </Button>
                      <Button
                        className="flex"
                        size="icon"
                        disabled={member.results.length > 0}
                        variant="destructive"
                        onClick={() => {
                          void mutateAsync(
                            { id: member.id },
                            {
                              onSuccess: () => {
                                toast({
                                  title: "メンバーを削除しました",
                                });
                                void refetch();
                              },
                            }
                          );
                        }}
                      >
                        削除
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <CreateMemberForm
        members={
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          members!
        }
      />
    </Layout>
  );
}
