import { Game, GameResult, Member, Rule, TipResult } from "@prisma/client";
import { formatISO } from "date-fns";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AspectRatio } from "~/components/ui/aspect-ratio";
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
import { DefaultQuantity } from "~/models/rule";

import { api } from "~/utils/api";
import { GroupBy, UniqueModels } from "~/utils/model";
import { RoundDown } from "~/utils/number";
import { RankPoint } from "~/utils/point";

const calcScore = (result: GameResult, rule: Rule) => {
  return (
    RoundDown(
      result.point - rule.referencePoint + RankPoint(result.rank, rule.uma),
      1000,
    ) / 1000
  );
};
const topScore = (rule: Rule, results: GameResult[], member: Member) => {
  return results
    .filter((result) => result.memberId !== member.id)
    .reduce((acc, result) => {
      return acc + -calcScore(result, rule);
    }, 0);
};

const calcScoreByGame = (
  game: Game,
  gameResults: GameResult[],
  member: Member,
): number => {
  return GroupBy(gameResults, (result) => result.sequence).reduce(
    (acc, [seq, results]) => {
      let acc2: number = acc;
      results
        .filter((result) => result.member.id === member.id)
        .forEach((result) => {
          acc2 +=
            result.rank === 1
              ? topScore(game.rule, results, member)
              : calcScore(result, game.rule);
        });
      return acc2;
    },
    0,
  );
};

const calcTipQuantity = (
  rule: Rule,
  tipResults: TipResult[],
  member: Member,
): number => {
  return (
    RoundDown(
      rule.tip *
        ((tipResults.find((result) => result.memberId === member.id)
          ?.quantity ?? 0) -
          DefaultQuantity),
      1000,
    ) / 1000
  );
};

const positionByRank = (
  gameResults: GameResult[],
  member: Member,
  rank: number,
) => {
  return GroupBy(gameResults, (result) => result.sequence).filter(
    ([seq, results]) => {
      return results.some(
        (result) => result.member.id === member.id && result.rank === rank,
      );
    },
  ).length;
};

export default function Home() {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const { data: games, isLoading } = api.game.getByYear.useQuery({
    year: year,
    initialData: [],
  });

  return (
    <>
      <Head>
        <title>Buti</title>
        <meta
          name="description"
          content="Buti - Recording score of the Mahjong"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto m-4 container">
          <h1 className="text-2xl text-center">{year}年の戦績</h1>
          {!isLoading &&
            games.map((game) => {
              const uniqMembers = UniqueModels<Member>(
                game.results.map((result) => {
                  return result.member;
                }),
              );
              const tipExist = (): boolean =>
                game.rule.tip > 0 &&
                game.tipResults.reduce((acc, result) => {
                  return acc + result.quantity;
                }, 0) ===
                  game.headCount * DefaultQuantity;
              return (
                <Table key={game.id} className="mx-auto">
                  <TableCaption>
                    {formatISO(game.date, { representation: "date" })}{" "}
                    {game.name}（対局数: {game.results.length / game.headCount}
                    ）
                    {game.parlor.name}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">{}</TableHead>
                      {uniqMembers.map((member) => {
                        return (
                          <TableHead
                            className="w-[100px] text-center"
                            key={member.id}
                          >
                            {member.name}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="w-[100px]">素点</TableCell>
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
                        <TableCell className="w-[100px]">チップ数</TableCell>
                        {uniqMembers.map((member) => {
                          return (
                            <TableCell
                              className="w-[100px] text-center"
                              key={`${game.id}-${member.id}-tip`}
                            >
                              {calcTipQuantity(
                                game.rule,
                                game.tipResults,
                                member,
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell className="w-[100px]">合計得点</TableCell>
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
                                  member,
                                ) + calcScoreByGame(game, game.results, member)
                              : calcScoreByGame(game, game.results, member)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell className="w-[100px]">1着数</TableCell>
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
                      <TableCell className="w-[100px]">2着数</TableCell>
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
                      <TableCell className="w-[100px]">3着数</TableCell>
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
                      <TableCell className="w-[100px]">4着数</TableCell>
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
                  </TableBody>
                </Table>
              );
            })}
          <div className="my-2 flex justify-center">
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
        </div>
      </main>
    </>
  );
}
