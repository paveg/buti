import { format } from "date-fns";
import Link from "next/link";
import { SkeletonTable } from "~/components/skeletonTable";
import { Layout } from "~/layouts";
import { Button } from "~/ui/button";
import { api } from "~/utils/api";

export default function Home() {
  const { data: gameSessions, isLoading, isError, error } = api.gameSession.getAll.useQuery();
  return (
    <Layout>
      <h1 className="my-4 text-center text-2xl">対局一覧</h1>
      {
        isLoading ? <SkeletonTable columnCount={2} /> : isError ? <p>{error?.message}</p> : <>{
          gameSessions.map((session) => {
            const sessionDate = format(new Date(session.date), 'yyyy/MM/dd')
            return <div key={session.id}>
              <Button variant="link" size="lg" asChild>
                <Link href={`/sessions/${session.id}`}>{sessionDate}@{session.parlor.name}</Link>
              </Button>
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
