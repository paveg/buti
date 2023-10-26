import { format } from "date-fns";
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
              {session.games.map((game) => {
                return <div key={game.id}>
                  第{game.sequence + 1}局
                  {game.players.map((player) => (
                    <div key={player.id}>{player.player.name} | {player.rank} | {player.score}</div>
                  ))}
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
