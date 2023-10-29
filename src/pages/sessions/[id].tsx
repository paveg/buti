import { useRouter } from "next/router";
import { SessionDetailContainer } from "~/components/containers/sessionDetailContainer";

const SessionDetail = () => {
  const router = useRouter();
  const id = router.query.id

  return id && <SessionDetailContainer id={id as string} />
};
export default SessionDetail;
