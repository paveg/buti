import { type FC } from "react";
import { Button } from "~/ui/button";
import { Skeleton } from "~/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";
import { useToast } from "~/ui/use-toast";
import { api } from "~/utils/api";

export const ParlorTable: FC = () => {
  const { data: parlors, isLoading, refetch } = api.parlor.getAll.useQuery();
  const { toast } = useToast();
  const { mutateAsync } = api.parlor.deleteById.useMutation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">雀荘名</TableHead>
          <TableHead className="text-center">総対局回数</TableHead>
          <TableHead className="text-center">操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            [...Array(5)].map((_, i) => (
              <TableRow key={`parlor-${i}`}>
                <TableCell>
                  <Skeleton className="h-6s w-[250px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[250px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-[120px]" />
                </TableCell>
              </TableRow>
            ))
          : parlors?.map((parlor) => {
              const matchCount = parlor.games.reduce((acc, games) => {
                const t = games.results.length / games.headCount;
                return acc + t;
              }, 0);
              return (
                <TableRow key={parlor.id}>
                  <TableCell className="text-center" key={`${parlor.id}-name`}>
                    {parlor.name}
                  </TableCell>
                  <TableCell
                    className="text-center"
                    key={`${parlor.id}-game-count`}
                  >
                    {matchCount}局
                  </TableCell>
                  <TableCell
                    className="text-center"
                    key={`${parlor.id}-delete`}
                  >
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={matchCount > 0}
                      onClick={() =>
                        void mutateAsync(
                          { id: parlor.id },
                          {
                            onSuccess: () => {
                              toast({
                                title: "雀荘を削除しました",
                              });
                              void refetch();
                            },
                          }
                        )
                      }
                    >
                      削除
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
      </TableBody>
    </Table>
  );
};
