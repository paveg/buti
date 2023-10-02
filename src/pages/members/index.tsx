import { useRouter } from "next/router";
import { Layout } from "~/components/layout";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/utils/api";

export default function () {
  const router = useRouter();
  const { data: members, isLoading } = api.member.getAll.useQuery();

  return (
    <Layout>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名前</TableHead>
            <TableHead>対局数</TableHead>
            <TableHead>平均順位</TableHead>
            <TableHead>連対率</TableHead>
            <TableHead>ラス率</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            members?.map((member) => {
              const matchCount = member.results.length;
              const averageRank = member.results.reduce((acc, result) => {
                switch (result.rank) {
                  case 1:
                    return acc + 1;
                  case 2:
                    return acc + 2;
                  case 3:
                    return acc + 3;
                  case 4:
                    return acc + 4;
                }
              }, 0);
              const winRate = (
                (member.results.reduce((acc, result) => {
                  if (result.rank === 1 || result.rank === 2) {
                    return acc + 1;
                  }
                  return acc;
                }, 0) /
                  matchCount) *
                100
              ).toFixed(2);
              const lastPlaceRate = (
                (member.results.reduce((acc, result) => {
                  if (result.rank === 4) {
                    return acc + 1;
                  }
                  return acc;
                }, 0) /
                  matchCount) *
                100
              ).toFixed(2);
              return (
                <TableRow onClick={() => router.push(`/members/${member.id}`)}>
                  <TableCell className="w-[120px]">{member.name}</TableCell>
                  <TableCell>{matchCount}</TableCell>
                  <TableCell>{(averageRank / matchCount).toFixed(2)}</TableCell>
                  <TableCell>{winRate}%</TableCell>
                  <TableCell>{lastPlaceRate}%</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Layout>
  );
}
