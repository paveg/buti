import { Layout } from "~/layouts";
import { api } from "~/utils/api";
import { CommonAlert } from "../commonAlert";
import { LoadingContainer } from "./loadingContainer";
import { Table, TableBody, TableCell, TableRow } from "~/ui/table";

export const PlayerDetailContainer = ({ id }: { id: string }) => {
  const {
    data: player,
    isLoading,
    isError,
    error,
  } = api.player.getById.useQuery({ id: id });
  if (isLoading) return <LoadingContainer table />
  const gameCount = player?.gamePlayers.length ?? 0;
  const topRate = (player?.gamePlayers ?? []).reduce((acc, curr) => {
    return curr.rank === 1 ? acc + 1 : 0
  }, 0) / gameCount
  const lastRate = (player?.gamePlayers ?? []).reduce((acc, curr) => {
    return curr.rank === 4 ? acc + 1 : 0
  }, 0) / gameCount
  const averageRank = (player?.gamePlayers ?? []).reduce((acc, curr) => {
    return acc + curr.rank
  }, 0) / gameCount
  const concatenationRate = (player?.gamePlayers ?? []).reduce((acc, curr) => {
    if (curr.rank === 1 || curr.rank === 2) return acc + 1
    return acc + 0
  }, 0) / gameCount
  const killRate = (player?.gamePlayers ?? []).reduce((acc, curr) => {
    return curr.killer ? acc + 1 : acc
  }, 0) / gameCount
  const killedRate = (player?.gamePlayers ?? []).reduce((acc, curr) => {
    return curr.killed ? acc + 1 : acc
  }, 0) / gameCount

  const data = [
    {
      label: '対局数',
      value: gameCount
    },
    {
      label: 'トップ率',
      value: Number.isNaN(topRate) ? '記録がありません' : `${(topRate * 100).toFixed(2)}%`
    },
    {
      label: 'ラス率',
      value: Number.isNaN(lastRate) ? '記録がありません' : `${(lastRate * 100).toFixed(2)}%`
    },
    {
      label: '平均順位',
      value: Number.isNaN(averageRank) ? '記録がありません' : `${averageRank.toFixed(2)}位`
    },
    {
      label: '連対率',
      value: Number.isNaN(concatenationRate) ? '記録がありません' : `${(concatenationRate * 100).toFixed(2)}%`
    },
    {
      label: '飛ばし率',
      value: Number.isNaN(killRate) ? '記録がありません' : `${(killRate * 100).toFixed(2)}%`
    },
    {
      label: 'トビ率',
      value: Number.isNaN(killedRate) ? '記録がありません' : `${(killedRate * 100).toFixed(2)}%`
    },
  ]

  return (
    <Layout>
      {isError ? (
        <CommonAlert message={error?.message} />
      ) : (
        <div>
          <h1 className="my-4 text-center text-2xl">
            {player?.name}
          </h1>
          <Table>
            <TableBody>
              {data.map((item) => {
                return (
                  <TableRow key={item.label}>
                    <TableCell>
                      {item.label}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.value}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </Layout>
  );

}
