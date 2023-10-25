import { PlayerTable } from "~/components/playerTable";
import { SkeletonTable } from "~/components/skeletonTable";
import { Layout } from "~/layouts";
import { api } from "~/utils/api";

export default function Home() {
  const { data: players, isLoading, isError } = api.player.getAll.useQuery();
  return (
    <Layout>
      <h1 className="my-4 text-center text-2xl">プレイヤー</h1>
      {isLoading ? (
        <SkeletonTable columnCount={6} />
      ) :
      <PlayerTable players={players} />
      }
    </Layout>
  );
}
