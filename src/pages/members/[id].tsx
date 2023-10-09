import { useRouter } from "next/router";
import { MemberDetailContainer } from "~/components/container/memberDetailContainer";
import { Layout } from "~/layouts";

export default function MemberDetail () {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="mx-auto m-4 container">
        {id && <MemberDetailContainer id={id} />}
      </div>
    </Layout>
  );
}
