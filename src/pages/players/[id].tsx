import { useRouter } from "next/router";
import { PlayerDetailContainer } from "~/components/containers/playerDetailContainer";

const PlayerDetail = () => {
  const router = useRouter();
  const id = router.query.id

  return id && <PlayerDetailContainer id={id as string} />
};
export default PlayerDetail;
