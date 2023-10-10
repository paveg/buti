import { type FC } from "react";
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
import { type GameWithResults } from "~/types/game";
import { type Member } from "@prisma/client";
import { type GameResultWithMember } from "~/types/gameResult";
import { SkeletonTable } from "../table/skeletonTable";

type Props = {
  id: string;
};

export const GameDetailContainer: FC<Props> = ({ id }: Props) => {
  const { data: game, isLoading } = api.game.getById.useQuery({ id: id });
  if (!isLoading) {
    const temporaryMembers = game?.results.map(
      (result: GameResultWithMember) => {
        return result.member;
      }
    );

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const members: Member[] = UniqueModels(temporaryMembers!);
    const gameBySequence = GroupBy(
      (game as GameWithResults)?.results,
      (result) => result.sequence
    );

    return (
      <>
        <div className="text-right">
          <CreateGameResultDialog game={game as GameWithResults} />
        </div>
        {isLoading ? (
          <SkeletonTable columnCount={6} />
        ) : (
          <>
            <h1 className="text-center text-2xl">{game?.name}</h1>
            <Table className="table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead className="" />
                  {members.map((member) => {
                    return (
                      <TableHead className="text-center" key={member.id}>
                        {member.name}
                      </TableHead>
                    );
                  })}
                  <TableHead className="text-center">飛び賞</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gameBySequence.map(([sequence, results]) => {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  const killer = results.find((result) => result.kill)?.member;
                  return (
                    <TableRow key={`game-${Number(sequence)}`}>
                      <TableCell className="text-center">
                        第{Number(sequence) + 1}局
                      </TableCell>
                      {results.map((result) => {
                        return (
                          <TableCell className="text-center" key={result.id}>
                            {result.point}
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center">
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
