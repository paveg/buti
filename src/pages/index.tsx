/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  type Game,
  type GameResult,
  type Member,
  type Rule,
  type TipResult,
} from "@prisma/client";
import { formatISO } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { CreateGameDialog } from "~/components/dialog/createGameDialog";
import { EditGameDialog } from "~/components/dialog/editGameDialog";
import { Layout } from "~/layouts";
import { DefaultQuantity } from "~/models/rule";
import { Button } from "~/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";

import { api } from "~/utils/api";
import { GroupBy, UniqueModels } from "~/utils/model";
import { RoundDown } from "~/utils/number";
import { RankPoint } from "~/utils/point";

const calcScore = (result: GameResult, rule: Rule) => {
  let p = result.point - rule.referencePoint + RankPoint(result.rank, rule.uma);
  if (result.negative) {
    p += -10000;
  }
  if (result.kill && result.negative) {
    p += 10000;
  }

  return RoundDown(p, 1000) / 1000;
};
const topScore = (rule: Rule, results: GameResult[], member: Member) => {
  return results
    .filter((result) => result.memberId !== member.id)
    .reduce((acc, result) => {
      return acc + -calcScore(result, rule);
    }, 0);
};

type GameWithRule = Game & { rule: Rule };

const calcScoreByGame = (
  game: GameWithRule,
  gameResults: GameResult[],
  member: Member
): number => {
  return GroupBy(gameResults, (result) => result.sequence).reduce(
    (acc, [_, results]) => {
      let acc2: number = acc;
      results
        .filter((result) => result.memberId === member.id)
        .forEach((result) => {
          acc2 +=
            result.rank === 1
              ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                topScore(game.rule, results, member)
              : // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                calcScore(result, game.rule);
        });
      return acc2;
    },
    0
  );
};

const calcTipQuantity = (
  rule: Rule,
  tipResults: TipResult[],
  member: Member
): number => {
  return (
    RoundDown(
      rule.tip *
        ((tipResults.find((result) => result.memberId === member.id)
          ?.quantity ?? 0) -
          DefaultQuantity),
      1000
    ) / 1000
  );
};

const positionByRank = (
  gameResults: GameResult[],
  member: Member,
  rank: number
) => {
  return GroupBy(gameResults, (result) => result.sequence).filter(
    ([_, results]) => {
      return results.some(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        (result) => result.memberId === member.id && result.rank === rank
      );
    }
  ).length;
};

const killedCount = (gameResults: GameResult[], member: Member) => {
  return GroupBy(gameResults, (result) => result.sequence).filter(
    ([_, results]) => {
      return results.some(
        (result) => result.memberId === member.id && result.negative
      );
    }
  ).length;
};

export default function Home() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const { data: games, isLoading } = api.game.getByYear.useQuery({
    year: year,
  });

  return (
    <Layout>
      <h1 className="my-4 text-center text-2xl">{year}年の戦績</h1>
      <CreateGameDialog />
      {!isLoading &&
        games?.map((game) => {
          const uniqMembers = UniqueModels<Member>(
            game.results.map((result) => {
              return result.member;
            })
          );
          const tipExist = (): boolean =>
            game.rule.tip > 0 &&
            game.tipResults.reduce((acc, result) => {
              return acc + result.quantity;
            }, 0) ===
              game.headCount * DefaultQuantity;
          const rounds = game.results.length / game.headCount;

          return (
            <Table
              key={game.id}
              className="mt-4 min-w-full text-center text-sm font-light"
            >
              <TableCaption className="caption-top underline">
                <Button variant="link" asChild>
                  <Link href={`/games/${game.id}`}>
                    {formatISO(game.date, { representation: "date" })}{" "}
                    {game.name} （対局数: {rounds}）{game.parlor.name}
                  </Link>
                </Button>
              </TableCaption>
              <TableHeader className="font-bold">
                <TableRow>
                  <TableHead className="w-[100px] text-left">
                    <EditGameDialog gameId={game.id} />
                  </TableHead>
                  {uniqMembers.map((member) => {
                    return (
                      <TableHead
                        className="w-[100px] text-center"
                        key={member.id}
                      >
                        <Link href={`/members/${member.id}`}>
                          {member.name}
                        </Link>
                      </TableHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="w-[100px] text-center">素点</TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${game.id}-${member.id}-point`}
                      >
                        {calcScoreByGame(game, game.results, member)}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {tipExist() && (
                  <TableRow>
                    <TableCell className="w-[100px] text-center">
                      チップ数
                    </TableCell>
                    {uniqMembers.map((member) => {
                      return (
                        <TableCell
                          className="w-[100px] text-center"
                          key={`${game.id}-${member.id}-tip`}
                        >
                          {calcTipQuantity(game.rule, game.tipResults, member)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                )}
                <TableRow>
                  <TableCell className="w-[100px] text-center">
                    合計点数
                  </TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${game.id}-${member.id}-amount`}
                      >
                        {tipExist()
                          ? calcTipQuantity(
                              game.rule,
                              game.tipResults,
                              member
                            ) + calcScoreByGame(game, game.results, member)
                          : calcScoreByGame(game, game.results, member)}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="w-[100px] text-center">1着数</TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${member.id}-1`}
                      >
                        {positionByRank(game.results, member, 1)}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="w-[100px] text-center">2着数</TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${member.id}-2`}
                      >
                        {positionByRank(game.results, member, 2)}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="w-[100px] text-center">3着数</TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${member.id}-3`}
                      >
                        {positionByRank(game.results, member, 3)}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="w-[100px] text-center">4着数</TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${member.id}-4`}
                      >
                        {positionByRank(game.results, member, 4)}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="w-[100px] text-center">
                    平均着順
                  </TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${member.id}-rank-average`}
                      >
                        {(
                          [...Array(game.headCount)]
                            .map((_, index) => {
                              return (
                                positionByRank(
                                  game.results,
                                  member,
                                  index + 1
                                ) *
                                (index + 1)
                              );
                            })
                            .reduce((acc, ranked) => {
                              return acc + ranked;
                            }, 0) / rounds
                        ).toFixed(2)}
                        位
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="w-[100px] text-center">
                    連対率
                  </TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${member.id}-plus-percentage`}
                      >
                        {(
                          ([...Array(2)]
                            .map((_, index) => {
                              return positionByRank(
                                game.results,
                                member,
                                index + 1
                              );
                            })
                            .reduce((acc, ranked) => {
                              return acc + ranked;
                            }, 0) /
                            rounds) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="w-[100px] text-center">
                    ラス率
                  </TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${member.id}-last-place-average`}
                      >
                        {(
                          (positionByRank(
                            game.results,
                            member,
                            game.headCount
                          ) /
                            rounds) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="w-[100px] text-center">
                    トビ回数
                  </TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${member.id}-killed-count`}
                      >
                        {killedCount(game.results, member)}
                      </TableCell>
                    );
                  })}
                </TableRow>
                <TableRow>
                  <TableCell className="w-[100px] text-center">
                    トビ率
                  </TableCell>
                  {uniqMembers.map((member) => {
                    return (
                      <TableCell
                        className="w-[100px] text-center"
                        key={`${member.id}-killed-percentile`}
                      >
                        {(
                          (killedCount(game.results, member) / rounds) *
                          100
                        ).toFixed(2)}
                        %
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </Table>
          );
        })}
      <div className="my-8 flex justify-center">
        <Button
          className="mx-1"
          variant="secondary"
          onClick={() => setYear(year - 1)}
        >
          前の年
        </Button>
        <Button
          className="mx-1"
          variant="secondary"
          onClick={() => setYear(year + 1)}
        >
          次の年
        </Button>
      </div>
    </Layout>
  );
}
