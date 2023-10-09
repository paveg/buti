import { type FC } from "react";

import { type Member } from "@prisma/client";
import { CreateGameResultDialog } from "~/components/dialog/createGameResultDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";
import { api } from "~/utils/api";
import { GroupBy, UniqueModels } from "~/utils/model";

type Props = {
  id: string;
};
export const GameDetailContainer: FC<Props> = ({ id }: Props) => {
  const { data: game, isLoading } = api.game.getById.useQuery({ id: id });
  if (isLoading) {
    return <>Loading...</>;
  } else {
    const members = UniqueModels<Member>(
      game.results.map((result) => {
        return result.member;
      }),
    );
    const gameBySequence = GroupBy(game?.results, (result) => result.sequence);

    return (
      <>
        <div className="text-right">
          <CreateGameResultDialog game={game} />
        </div>
        {!isLoading && (
          <>
            <h1 className="text-2xl text-center">{game?.name}</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead />
                  {members.map((member) => {
                    return <TableHead key={member.id}>{member.name}</TableHead>;
                  })}
                  <TableHead className="text-right">備考</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameBySequence.map(([sequence, results]) => {
                  const killer = results.find((result) => result.kill)?.member;
                  const deaths = results
                    .filter((result) => result.negative)
                    .map((result) => result.member);
                  return (
                    <TableRow key={`game-${Number(sequence)}`}>
                      <TableCell>第{Number(sequence) + 1}局</TableCell>
                      {results.map((result) => {
                        return <TableCell key={result.id}>{result.point}</TableCell>;
                      })}
                      <TableCell className="w-[250px]">
                        {killer &&
                          `飛び賞: ${killer.name} -> ${deaths.map(
                            (member) => member.name,
                          ).join(",")}`}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </>
        )}
      </>
    );
  }
};
