import Link from "next/link";
import { useRouter } from "next/router";
import { GameDetail } from "~/components/games/detail";
import { Layout } from "~/layouts";

export default function () {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="mx-auto m-4 container">
        {id && <GameDetail id={id} />}
      </div>
    </Layout>
  );
}
