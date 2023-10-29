import { Layout } from "~/layouts";
import { api } from "~/utils/api";
import { CommonAlert } from "../commonAlert";

export const PlayerDetailContainer = ({ id }: { id: string }) => {
  const {
    data: player,
    isLoading,
    isError,
    error,
  } = api.player.getById.useQuery({ id: id });
  if (isLoading) return <div>loading...</div>;
  const gameCount = player?.gamePlayers.length ?? 0;
  const averageRank = (player?.gamePlayers ?? []).reduce((acc, curr) => {
    return acc + curr.rank
  }, 0) / gameCount
  const concatenationRate = (player?.gamePlayers ?? []).reduce((acc, curr) => {
    if (curr.rank === 1 || curr.rank === 2) return acc + 1
    return acc + 0
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
          <div>平均順位: {Number.isNaN(averageRank) ? '記録がありません' : `${averageRank.toFixed(2)}位`}</div>
          <div>連対率: {Number.isNaN(concatenationRate) ? '記録がありません' : `${concatenationRate * 100}%`}</div>
        </div>
      )}
    </Layout>
  );

}
