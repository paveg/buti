import { useRouter } from "next/router";
import { GameDetailContainer } from "~/components/container/gameDetailContainer";
import { Layout } from "~/layouts";

export default function GameDetail () {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="mx-auto m-4 container">
        {id && <GameDetailContainer id={id as string} />}
      </div>
    </Layout>
  );
}
