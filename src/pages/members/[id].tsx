import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { MemberDetailContainer } from "~/components/container/memberDetail";
import { Layout } from "~/layouts";

export default function () {
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
