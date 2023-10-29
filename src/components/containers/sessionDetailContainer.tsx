import { format } from "date-fns";
import { Layout } from "~/layouts";
import { api } from "~/utils/api";
import { CommonAlert } from "../commonAlert";
import { SessionTable } from "../sessions/table";
import { RuleTable } from "../rule/table";
import { Skeleton } from "~/ui/skeleton";
import { SkeletonTable } from "../skeletonTable";

export const SessionDetailContainer = ({ id }: { id: string }) => {
  const {
    data: gameSession,
    isLoading,
    isError,
    error,
  } = api.gameSession.getById.useQuery({ id: id });

  if (isLoading) {
    return <Layout>
      <div>
        <h1 className="my-4">
          <Skeleton className="w-1/3 mx-auto h-8" />
          <SkeletonTable columnCount={5} />
        </h1>
      </div>
    </Layout>
  } else {
    const sessionDate = format(new Date(gameSession?.date ?? ''), "yyyy/MM/dd");
    return <Layout>
      {isError ? (
        <CommonAlert message={error?.message} />
      ) : (
        <div>
          <h1 className="my-4 text-center text-2xl">
            {sessionDate}@{gameSession?.parlor.name}
          </h1>
          {gameSession && <SessionTable session={gameSession} />}
          {gameSession?.rule && <RuleTable rule={gameSession.rule} />}
        </div>
      )}
    </Layout>
  }
}
