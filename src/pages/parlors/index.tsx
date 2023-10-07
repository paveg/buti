import { ParlorForm } from "~/components/forms/parlorForm";
import { Layout } from "~/layouts";
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

export default function () {
  const { data: parlors, isLoading, refetch } = api.parlor.getAll.useQuery();
  const { mutateAsync } = api.parlor.deleteById.useMutation();
  const { toast } = useToast();
  return (
    <Layout>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>雀荘名</TableHead>
            <TableHead>総対局回数</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading
            ? [...Array(5)].map((_, i) => (
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
              const matchCount = parlor.games.length;
                return (
                  <TableRow key={parlor.id}>
                    <TableCell key={`${parlor.id}-name`}>
                      {parlor.name}
                    </TableCell>
                    <TableCell key={`${parlor.id}-game-count`}>
                      {matchCount}
                      局
                    </TableCell>
                    <TableCell key={`${parlor.id}-delete`}>
                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={matchCount > 0}
                        onClick={() =>
                          mutateAsync(
                            { id: parlor.id },
                            {
                              onSuccess: () => {
                                toast({
                                  title: "雀荘を削除しました",
                                });
                                refetch();
                              },
                            },
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
      <ParlorForm parlors={parlors} />
    </Layout>
  );
}
