import { type GamePlayer, type Rule } from "@prisma/client";
import { useReactTable, getCoreRowModel, type ColumnDef } from "@tanstack/react-table";
import { type SessionWithDetails } from "~/types/gameSession";
import { Badge } from "~/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/ui/table";
import { RoundDown } from '../../utils/number';
import { HoverCard } from "~/ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Button } from "~/ui/button";
import Link from "next/link";

type PlayerData = {
  id: string;
  name: string;
  finalScore: number;
  [key: string]: string | number;
};

const defaultScore = ({ rule }: { rule: Rule }) => {
  return 25000 + (Number(rule?.oka) / Number(rule?.playerCount))
}

const calculateScore = ({ defaultScore, rule, player, killedCount }: { defaultScore: number; rule: Rule; player: GamePlayer; killedCount: number }) => {
  let score = player.score - defaultScore
  let uma: number
  switch (player.rank) {
    case 1:
      uma = rule.uma === '10-30' ? 30000 : 0
      break;
    case 2:
      uma = rule.uma === '10-30' ? 10000 : 0
      break;
    case 3:
      uma = rule.uma === '10-30' ? -10000 : 0
      break;
    case 4:
      uma = rule.uma === '10-30' ? -30000 : 0
      break;
    default:
      uma = 0
      break;
  }
  score += uma
  if (player.rank === 1) {
    score += rule.oka
  }
  if (player.killer) {
    score += (rule.killScore * killedCount)
  }
  if (player.killed) {
    score -= rule.killScore
  }

  return score
}

export const SessionTable = ({ session }: { session: SessionWithDetails }) => {
  const rule = session.rule;
  const data: PlayerData[] = [];
  const allPlayers = session.games.flatMap((game) =>
    game.players.map((player) => player.player)
  );
  for (const player of allPlayers) {
    if (!data.find((record) => record.name === player.name)) {
      data.push({
        id: player.id,
        name: player.name,
        finalScore: 0
      });
    }
  }
  for (const game of session.games) {
    const ds = defaultScore({ rule: rule })
    const finalScoreKey = "finalScore";
    for (const player of game.players) {
      const record = data.find((record) => record.name === player.player.name);
      if (record) {
        const score = calculateScore({ defaultScore: ds, rule: rule, player: player, killedCount: game.players.filter((player) => player.killed).length })
        record[finalScoreKey] = (record[finalScoreKey] ?? 0) + (RoundDown(score, 1000) / 1000)
      }
    }
  }

  // TODO: Replace hard-coded columns with dynamic columns using by ColumnDef
  const columns: ColumnDef<PlayerData>[] = [];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="w-full">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <TableRow key={headerGroup.id}>
              <TableHead />
              {data.map((record) => {
                return (
                  <TableHead key={record.name} className="text-center">
                    <Button asChild variant="link">
                      <Link href={`/players/${record.id}`}>{record.name}</Link>
                    </Button>
                  </TableHead>
                );
              })}
            </TableRow>
          );
        })}
      </TableHeader>
      <TableBody>
        {session.games.map((game, index) => {
          const ds = defaultScore({ rule: rule })
          const killedCount = game.players.filter((player) => player.killed).length
          return (
            <TableRow key={game.id}>
              <TableCell className="text-center">第{index + 1}局</TableCell>
              {game.players.map((player) => {
                const score = calculateScore({ defaultScore: ds, rule: rule, player: player, killedCount: killedCount })
                return (
                  <TableCell key={player.player.name} className="text-center">
                    <HoverCard>
                      <HoverCardTrigger>
                        {RoundDown(score, 1000) / 1000}<span className="hidden sm:inline-block">({player.rank})</span>
                      </HoverCardTrigger>
                      <HoverCardContent side="top">
                        <Badge variant="secondary" className="ml-1 my-1 sm:my-0">得点: {player.score}</Badge>
                        {player.killer && (
                          <Badge className="ml-1">トビ賞</Badge>
                        )}
                        {player.killed && (
                          <Badge variant="destructive" className="ml-1">
                            トビ
                          </Badge>
                        )}
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
        {data.length !== 0 ? (
          <TableRow>
            <TableCell className="text-center">
              合計
            </TableCell>
            {data.map((record) => {
              return <TableCell key={record.name} className="text-center">
                <Badge className="font-bold">{record.finalScore}</Badge>
              </TableCell>
            })}
          </TableRow>
        ) : (<TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            対局が存在しません
          </TableCell>
        </TableRow>)
        }
      </TableBody>
    </Table >
  );
};