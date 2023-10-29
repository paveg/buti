import { Layout } from "~/layouts";
import { api } from "~/utils/api";
import { CommonAlert } from "../commonAlert";
import { LoadingContainer } from "./loadingContainer";

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

  return (
    <Layout>
      {isError ? (
        <CommonAlert message={error?.message} />
      ) : (
        <div>
          <h1 className="my-4 text-center text-2xl">
            {player?.name}
          </h1>
          <div>対局数: {gameCount}</div>
          <div>トップ率: {Number.isNaN(topRate) ? '記録がありません' : `${(topRate * 100).toFixed(2)}%`}</div>
          <div>ラス率: {Number.isNaN(lastRate) ? '記録がありません' : `${(lastRate * 100).toFixed(2)}%`}</div>
          <div>平均順位: {Number.isNaN(averageRank) ? '記録がありません' : `${averageRank.toFixed(2)}位`}</div>
          <div>連対率: {Number.isNaN(concatenationRate) ? '記録がありません' : `${(concatenationRate * 100).toFixed(2)}%`}</div>
          <div>飛ばし率: {Number.isNaN(killRate) ? '記録がありません' : `${(killRate * 100).toFixed(2)}%`}</div>
          <div>トビ率: {Number.isNaN(killedRate) ? '記録がありません' : `${(killedRate * 100).toFixed(2)}%`}</div>
        </div>
      )}
    </Layout>
  );

}
