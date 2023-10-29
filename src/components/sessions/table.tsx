import { type GamePlayer, type Rule } from "@prisma/client";
import { TooltipContent } from "@radix-ui/react-tooltip";
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
import { Tooltip, TooltipTrigger } from "~/ui/tooltip";
import { RoundDown } from '../../utils/number';
import { HoverCard } from "~/ui/hover-card";
import { HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";

type PlayerData = {
  name: string;
  finalScore: number;
  [key: string]: string | number;
};

const defaultScore = ({ rule, playerCount }: { rule: Rule; playerCount: number }) => {
  return 25000 + (Number(rule?.oka) / Number(playerCount))
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
        name: player.name,
      });
    }
  }
  for (const game of session.games) {
    const key = `score${game.sequence}`;
    for (const player of game.players) {
      const record = data.find((record) => record.name === player.player.name);
      if (record) {
        record[key] = player.score;
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
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <TableRow key={headerGroup.id}>
              <TableHead />
              {data.map((record) => {
                return (
                  <TableHead key={record.name} className="text-center">
                    {record.name}
                  </TableHead>
                );
              })}
            </TableRow>
          );
        })}
      </TableHeader>
      <TableBody>
        {session.games.map((game, index) => {
          const ds = defaultScore({ rule: rule, playerCount: game.playerCount })
          const killedCount = game.players.filter((player) => player.killed).length
          return (
            <TableRow key={game.id}>
              <TableCell className="text-center">第{index + 1}局</TableCell>
              {game.players.map((player) => {
                const score = calculateScore({ defaultScore: ds, rule: rule, player: player, killedCount: killedCount })
                return (
                  <TableCell key={player.player.name} className="text-center">
                    <Badge variant="outline" className="mr-1">
                      {player.rank}
                    </Badge>
                    <HoverCard>
                      <HoverCardTrigger>{RoundDown(score, 1000) / 1000}</HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        実際の得点: {player.score}
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
      </TableBody>
    </Table>
  );
};
