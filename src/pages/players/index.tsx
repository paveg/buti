import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import { PlayerTable } from "~/components/playerTable";
import { SkeletonTable } from "~/components/skeletonTable";
import { Layout } from "~/layouts";
import { Alert, AlertDescription, AlertTitle } from "~/ui/alert";
import { api } from "~/utils/api";

const EmptyComponent = () => {
  return <Alert>
    <RocketIcon className="h-4 w-4" />
    <AlertTitle>プレイヤーが存在しません</AlertTitle>
    <AlertDescription>
      プレイヤーを追加してください
    </AlertDescription>
  </Alert>
}

const AlertComponent = ({ message }: { message: string }) => {
  return <Alert variant="destructive">
    <ExclamationTriangleIcon className="h-4 w-4" />
    <AlertTitle>エラー</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
}

export default function Home() {
  const { data: players, isLoading, isError, error } = api.player.getAll.useQuery();
  return (
    <Layout>
      <h1 className="my-4 text-center text-2xl">プレイヤー</h1>
      {isLoading ? (
        <SkeletonTable columnCount={2} />
      ) :
        isError ? <AlertComponent message={error?.message} /> : players.length > 0 ? <PlayerTable players={players} /> : <EmptyComponent />
      }
    </Layout>
  );
}
