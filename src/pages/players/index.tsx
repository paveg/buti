import { CommonAlert } from "~/components/commonAlert";
import { EmptyResource } from "~/components/emptyResource";
import { PlayerTable } from "~/components/playerTable";
import { SkeletonTable } from "~/components/skeletonTable";
import { Layout } from "~/layouts";
import { api } from "~/utils/api";


export default function Players() {
  const subject = "雀士"
  const { data: players, isLoading, isError, error } = api.player.getAll.useQuery();
  return (
    <Layout>
      <h1 className="my-4 text-center text-2xl">{subject}</h1>
      {isLoading ? (
        <SkeletonTable columnCount={2} />
      ) :
        isError ? <CommonAlert message={error?.message} /> : players.length > 0 ? <PlayerTable players={players} /> : <EmptyResource subject={subject} />
      }
    </Layout>
  );
}
