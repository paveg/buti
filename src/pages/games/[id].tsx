import { useRouter } from "next/router";
import { GameDetailContainer } from "~/components/container/gameDetailContainer";
import { Layout } from "~/layouts";

export default function GameDetail() {
  const router = useRouter();
  const { id } = router.query;

  return <Layout>{id && <GameDetailContainer id={id as string} />}</Layout>;
}
