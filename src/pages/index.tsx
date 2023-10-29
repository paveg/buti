import { format } from "date-fns";
import Link from "next/link";
import { SkeletonTable } from "~/components/skeletonTable";
import { Layout } from "~/layouts";
import { api } from "~/utils/api";

export default function Home() {
  const { data: gameSessions, isLoading, isError, error } = api.gameSession.getAll.useQuery();
  return (
    <Layout>
      <h1 className="my-4 text-center text-2xl">戦績表</h1>
      {
        isLoading ? <SkeletonTable columnCount={2} /> : isError ? <p>{error?.message}</p> : <>{
          gameSessions.map((session) => {
            const sessionDate = format(new Date(session.date), 'yyyy/MM/dd')
            return <div key={session.id}>
              <h2>{sessionDate}</h2>
              <Link href={`/sessions/${session.id}`}>link</Link>
              {session.games.map((game) => {
                return <div key={game.id}>
                  第{game.sequence + 1}局
                </div>
              })}
            </div>
          })
        }</>
      }
      {
        //JSON.stringify(gameSessions, null, 2)
      }
    </Layout>
  );
}
