import { type Player } from "@prisma/client";
import { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";
import { format } from "date-fns";
import Link from "next/link";

type Props = {
  players: Player[] | undefined;
};

export const PlayerTable = memo(function PlayerTableMemo({ players }: Props) {
  return (
    <Table className="my-4 table-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">名前</TableHead>
          <TableHead className="text-center">作成日</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players?.map((player) => {
          const createdDate = format(new Date(player.createdAt), "yyyy/MM/dd");
          return (
            <Link key={player.id} legacyBehavior href={`/players/${player.id}`}>
              <TableRow key={player.id}>
                <TableCell className="pointer-events-auto text-center">
                  {player.name}
                </TableCell>
                <TableCell className="pointer-events-auto text-center">
                  {createdDate}
                </TableCell>
              </TableRow>
            </Link>
          );
        })}
      </TableBody>
    </Table>
  );
});
