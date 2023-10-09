import { type FC } from "react";

import { type GameResult, type Game, type Member } from "@prisma/client";
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

type ResultWithMember = GameResult & { member: Member };
type GameWithResults = Game & { results: ResultWithMember[] };
export const GameDetailContainer: FC<Props> = ({ id }: Props) => {
  const { data: game, isLoading } = api.game.getById.useQuery({ id: id });
  if (isLoading) {
    return <>Loading...</>;
  } else {
    const members = UniqueModels(
      (game as GameWithResults)?.results.map((result) => {
        return result.member;
      })
    );
    const gameBySequence = GroupBy(
      (game as GameWithResults)?.results,
      (result) => result.sequence
    );

    return (
      <>
        <div className="text-right">
          <CreateGameResultDialog game={game as Game} />
        </div>
        {!isLoading && (
          <>
            <h1 className="text-center text-2xl">{game?.name}</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]" />
                  {members.map((member) => {
                    return (
                      <TableHead className="text-center" key={member.id}>
                        {member.name}
                      </TableHead>
                    );
                  })}
                  <TableHead className="w-[100px] text-center">
                    飛び賞
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameBySequence.map(([sequence, results]) => {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  const killer = results.find((result) => result.kill)?.member;
                  return (
                    <TableRow key={`game-${Number(sequence)}`}>
                      <TableCell className="w-[150px] text-center">
                        第{Number(sequence) + 1}局
                      </TableCell>
                      {results.map((result) => {
                        return (
                          <TableCell
                            className="w-[100px] text-center"
                            key={result.id}
                          >
                            {result.point}
                          </TableCell>
                        );
                      })}
                      <TableCell className="w-[200px] text-center">
                        {killer && killer.name}
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
