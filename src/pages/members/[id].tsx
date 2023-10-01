import { Car } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Line, LineChart, Tooltip, XAxis, CartesianGrid } from "recharts";
import { api } from "~/utils/api";

type Props = { id: string }
export default function Member() {
  const router = useRouter();
  const { id } = router.query;
  const { data: member, isLoading } = api.member.get.useQuery({ id: id });

  return (
    <>
      <Head>
        <title>Buti</title>
        <meta
          name="description"
          context="Buti - Recording score of the Mahjong"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto m-4 container">
          <h1 className="text-2xl text-center">{member?.name}</h1>
          {!isLoading && (
            <LineChart
              className="mx-auto w-[800px]"
              width={800}
              height={300}
              data={member?.results.map((result) => {
                return { name: `${result.game.name}${result.sequence + 1}局`, rank: result.rank, point: result.point };
              })}
            >
              <Line type="monotone" dataKey="point" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <Tooltip />
            </LineChart>
          )}
        </div>
        <Link href="/">戻る</Link>
      </main>
    </>
  );
}
