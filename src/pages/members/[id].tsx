import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { MemberDetail } from "~/components/member/detail";

export default function () {
  const router = useRouter();
  const { id } = router.query;

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
          {id && <MemberDetail id={id} />}
        </div>
        <Link href="/">戻る</Link>
      </main>
    </>
  );
}
